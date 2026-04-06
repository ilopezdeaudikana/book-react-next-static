import { Repo } from '@repo/utils'
import { JSX } from 'react'

export interface RepoApiData {
  error: string | null,
  repos: Repo[],
  selected?: string
}

export interface Column {
  title: string
  dataIndex: string
  key: string
  render?: (a: string, record: any) => string | JSX.Element
}

