import { NextResponse } from 'next/server';
import apiData from '../../../../data'
import { ProjectDetail, Project } from '../../../types'

export async function GET(request: Request, { params } : { params: Promise<{ slug: string }> }) : Promise<NextResponse> {
  const { slug  } = await params
  if(!slug) return NextResponse.json<Record<'projects', Project[]>>({ projects: apiData.projects.reverse() })
  else return NextResponse.json<Record<'project', ProjectDetail | undefined>>({ project: apiData.records.find(record => record.projectId === slug[0])  })
}