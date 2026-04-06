import { JSX } from 'react'

export interface RepoApiData {
  repos: Repo['node'][],
  error: string | null
}

export interface Repo {
  node: {
    id: string
    name: string
    url: string
    forkCount: number
    stargazerCount: number
  }
}

export interface AgentRepo {
  fullName: string,
  description: string,
  stargazersCount: number,
  htmlUrl: string
}
export interface Column {
  title: string
  dataIndex: string
  key: string
  render?: (a: string, record: any) => string | JSX.Element
}

