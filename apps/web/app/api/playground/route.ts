import { NextResponse } from 'next/server';
import apiData from '../../../data'
import { Project } from '../../types'

export async function GET() : Promise<NextResponse> {
  return NextResponse.json<Record<'projects', Project[]>>({ projects: apiData.playground.reverse() })
}