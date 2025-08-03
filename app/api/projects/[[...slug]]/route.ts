import { NextResponse } from 'next/server';
import apiData from '../../../../data'
import { ProjectDetail, Project } from '../../../types'

interface RouteContext {
  params: { slug: string[] }
}
export async function GET(request: Request, context: RouteContext) {
  const { slug  } = context.params
  if(!slug) return NextResponse.json<Record<'projects', Project[]>>({ projects: apiData.projects })
  else return NextResponse.json<Record<'project', ProjectDetail | undefined>>({ project: apiData.records.find(record => record.projectId === slug[0])  })
}