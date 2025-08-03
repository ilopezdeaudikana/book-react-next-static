import { NextResponse } from 'next/server';
import apiData from '../../../../data'
import { ProjectDetail, Project } from '../../../types'

export async function GET(request: Request, { params }: { params: { slug?: string | string[] } }) {
  const { slug  } = params
  if(!slug) return NextResponse.json<Record<'projects', Project[]>>({ projects: apiData.projects })
  else return NextResponse.json<Record<'project', ProjectDetail | undefined>>({ project: apiData.records.find(record => record.projectId === slug[0])  })
}