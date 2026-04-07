import { ReposTable } from './components/repos-table'
import { SearchInput } from './components/search-input'
import { getGithubAgentData } from './lib/getGithubData'
import { RepoApiData } from '../types'
import { Flex, Typography, Collapse } from '@repo/ui'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import parse from 'html-react-parser'

export default async function Repos({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {

  const fetchedParams = await searchParams
  const query = fetchedParams.query || 'typescript'

  const result: RepoApiData = await getGithubAgentData(query)

  if (!result || result?.error) {
    return (
      <Flex gap="1rem" vertical>
        <SearchInput value={query} />
        <Typography data-testid='error' variant="text" type="danger">Error! {result?.error}</Typography>
      </Flex>
    )
  }

  const readme = result.readme?.content

  const parseReadme = async (content: string) => {
    const htmlString = await marked.parse(content)
    const cleanHtml = DOMPurify.sanitize(htmlString)
    return parse(cleanHtml)
  }

  const collapsableItems = [
    {
      key: '1',
      label: 'Recomended package',
      children: <Typography variant="text">{result.selected}</Typography>
    },
    (readme ? {
      key: '2',
      label: 'Readme file',
      children: <Typography variant="text">{parseReadme(readme)}</Typography>,
    } : undefined)
  ].filter(Boolean)

  return (
    <Flex gap="1rem" vertical style={{ width: '90%' }}>
      <Flex gap="1rem" vertical style={{ marginTop: '1rem' }}>
        <label htmlFor='searchInput'><Typography variant="text">Search for a package</Typography></label>
        <SearchInput id="searchInput" value={query} />
      </Flex>

      <Collapse
        defaultActiveKey={['1']}
        items={collapsableItems}
      />

      <ReposTable data={result.repos} />
    </Flex>
  )
}
