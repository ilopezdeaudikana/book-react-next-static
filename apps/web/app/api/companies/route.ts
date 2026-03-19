import { NextResponse } from 'next/server';
import apiData from '../../../data'
import { Company } from '../../types'

export async function GET(request: Request) {

  return NextResponse.json<Record<'companies', Company[]>>({ companies: apiData.companies })
}