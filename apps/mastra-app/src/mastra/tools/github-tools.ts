import { ApiRepo, Repo } from '@repo/utils'

const README_CHAR_LIMIT = 12000
const DISPLAY_RESULT_LIMIT = 10
const SEARCH_RESULT_PAGE_SIZE = 10

interface RepoReadmeResponse {
  content?: string
  encoding?: string
  path?: string
}

interface NamedReadme extends RepoReadmeResponse {
  name: string
  found: boolean
}

const getGitHubHeaders = (): HeadersInit => {
  const token = process.env.GITHUB_TOKEN

  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Mastra-GitHub-Scout',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const githubRequest = async <T>(path: string): Promise<T> => {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: getGitHubHeaders(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`GitHub API failed (${response.status}): ${error}`)
  }

  return response.json() as Promise<T>
}

const isGitHub404 = (error: unknown) =>
  error instanceof Error && error.message.includes('GitHub API failed (404)')

const SEARCH_STOP_WORDS = new Set(['and', 'or', 'the', 'a', 'an', 'for', 'with', 'using', 'in', 'of'])
const normalizeSearchText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const sanitizeSearchTerms = (topic: string) => {
  const parts = topic
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/i)
    .map((part) => part.trim())
    .filter((part) => part.length > 1 && !SEARCH_STOP_WORDS.has(part))

  const uniqueParts = Array.from(new Set(parts))

  if (uniqueParts.length === 0) {
    return [topic.trim()].filter(Boolean)
  }

  return uniqueParts.slice(0, 5)
}

const buildSearchQueries = (topic: string) => {
  const terms = sanitizeSearchTerms(topic)
  const exactPhrase = topic.trim().replace(/\s+/g, ' ')
  const queries = new Set<string>()

  if (exactPhrase) {
    queries.add(`"${exactPhrase}" in:name,description`)
  }

  if (terms.length > 0) {
    queries.add(`${terms.join(' ')} in:name,description`)
  }

  if (terms.length > 1) {
    for (let index = 0; index < terms.length - 1; index += 1) {
      queries.add(`${terms[index]} ${terms[index + 1]} in:name,description`)
    }
  }

  terms.slice(0, 5).forEach((term) => {
    queries.add(`${term} in:name,description`)
  })

  return Array.from(queries).slice(0, 8)
}

const toRepoResult = (repo: ApiRepo, key: number): Repo => {
  
  // TODO: get locale dynamically
  const acceptLanguage = 'en-IE'

  const { id, name, description, archived, disabled } = repo

  return {
    id: String(id),
    key,
    name,
    fullName: repo.full_name,
    url: repo.html_url,
    description: description ?? '',
    forkCount: repo.forks_count,
    stargazerCount: repo.stargazers_count,
    watchersCount: repo.watchers_count,
    openIssues: repo.open_issues_count,
    updatedAt: new Date(repo.updated_at).toLocaleString(acceptLanguage, {
      dateStyle: "short"
    }),
    pushedAt: new Date(repo.pushed_at).toLocaleString(acceptLanguage, {
      dateStyle: "short"
    }),
    archived,
    disabled,
    hasIssues: repo.has_issues,
    hasWiki: repo.has_wiki,
    hasPages: repo.has_pages
  }
}

const getCoverage = (repo: Repo, terms: string[]) => {
  const haystacks = [
    normalizeSearchText(repo.name),
    normalizeSearchText(repo.fullName),
    normalizeSearchText(repo.description ?? ''),
  ]

  return terms.filter((term) => {
    const normalizedTerm = normalizeSearchText(term)
    return normalizedTerm.length > 0 && haystacks.some((text) => text.includes(normalizedTerm))
  }).length
}

const getFieldScore = (repo: Repo, term: string) => {
  const normalizedTerm = normalizeSearchText(term)
  const name = normalizeSearchText(repo.name)
  const fullName = normalizeSearchText(repo.fullName)
  const description = normalizeSearchText(repo.description ?? '')

  let score = 0

  if (name === normalizedTerm) score += 20
  else if (name.startsWith(normalizedTerm)) score += 14
  else if (name.includes(normalizedTerm)) score += 8

  if (fullName.includes(normalizedTerm)) score += 5
  if (description.includes(normalizedTerm)) score += 3

  return score
}

const getAuthorityScore = (repo: Repo) =>
  Math.log10(repo.stargazerCount + 1) * 10 + Math.log10(repo.forkCount + 1) * 6

const getLexicalScore = (topic: string, repo: Repo) => {
  const terms = sanitizeSearchTerms(topic)
  const coverage = getCoverage(repo, terms)
  const phrase = normalizeSearchText(topic)
  const normalizedName = normalizeSearchText(repo.name)
  const normalizedFullName = normalizeSearchText(repo.fullName)
  const normalizedDescription = normalizeSearchText(repo.description ?? '')

  const termScore = terms.reduce((score, term) => score + getFieldScore(repo, term), 0)
  const phraseScore =
    (normalizedName.includes(phrase) ? 18 : 0) +
    (normalizedFullName.includes(phrase) ? 10 : 0) +
    (normalizedDescription.includes(phrase) ? 6 : 0)

  return coverage * 25 + termScore + phraseScore
}

const getRankingSignals = (topic: string, repo: Repo) => {
  const coverage = getCoverage(repo, sanitizeSearchTerms(topic))
  const lexicalScore = getLexicalScore(topic, repo)
  const authorityScore = getAuthorityScore(repo)

  return {
    coverage,
    lexicalScore,
    authorityScore,
  }
}

export const rankRepositories = (topic: string, repos: Repo[]) =>
  [...repos]
    .sort((a, b) => {
      const aSignals = getRankingSignals(topic, a)
      const bSignals = getRankingSignals(topic, b)
      const coverageDiff = bSignals.coverage - aSignals.coverage

      if (coverageDiff !== 0) {
        return coverageDiff
      }

      const authorityDiff = bSignals.authorityScore - aSignals.authorityScore
      if (authorityDiff !== 0) {
        return authorityDiff
      }

      const lexicalDiff = bSignals.lexicalScore - aSignals.lexicalScore
      if (lexicalDiff !== 0) {
        return lexicalDiff
      }

      if (b.stargazerCount !== a.stargazerCount) {
        return b.stargazerCount - a.stargazerCount
      }

      return b.forkCount - a.forkCount
    })
    .map((repo, index) => ({
      ...repo,
      key: index,
    }))

export const searchRepositories = async (topic: string) => {
  const queries = buildSearchQueries(topic)

  const searchResults = await Promise.all(
    queries.map(async (query) => {
      try {
        return await githubRequest<{ items: ApiRepo[] }>(
          `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${SEARCH_RESULT_PAGE_SIZE}`
        )
      } catch (error) {
        console.log('Error searching repos', JSON.stringify(error))
        if (error instanceof Error && error.message.includes('(422)')) {
          return { items: [] }
        }

        throw error
      }
    })
  )

  const uniqueRepos = new Map<string, Repo>()

  searchResults
    .flatMap((result) => result.items)
    .forEach((repo) => {
      if (!uniqueRepos.has(repo.full_name)) {
        uniqueRepos.set(repo.full_name, toRepoResult(repo, uniqueRepos.size))
      }
    })

  console.log('SearchResults?', !!searchResults.length, uniqueRepos.size)
  const ranked = rankRepositories(topic, Array.from(uniqueRepos.values()))
  const terms = sanitizeSearchTerms(topic)
  const filtered =
    terms.length > 1
      ? ranked.filter((repo) => getCoverage(repo, terms) >= Math.min(2, terms.length))
      : ranked

  console.log('Filtered', filtered.length)
  return (filtered.length > 0 ? filtered : ranked).slice(0, DISPLAY_RESULT_LIMIT)
}

export const fetchReadme = async (fullName: string): Promise<[string, NamedReadme]> => {
  try {
    const readme = await githubRequest<RepoReadmeResponse>(`/repos/${fullName}/readme`)
    const encodedContent = readme.content ?? ''
    const content =
      readme.encoding === 'base64'
        ? Buffer.from(encodedContent.replace(/\n/g, ''), 'base64').toString('utf8')
        : encodedContent

    return [fullName, {
      name: fullName,
      found: Boolean(content.trim()),
      path: readme.path ?? 'README.md',
      content: content.slice(0, README_CHAR_LIMIT),
    }]
  } catch (error) {
    if (isGitHub404(error)) {
      return [fullName, {
        found: false,
        path: 'README.md',
        content: '',
        name: fullName
      }]
    }

    throw error
  }
}

