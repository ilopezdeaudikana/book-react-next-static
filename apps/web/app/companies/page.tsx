import { Typography } from '@repo/ui'
import { CompanyList } from '../../components/companies/company-list'
import { url } from '@repo/utils'

export default async function Companies() {
  try {
    const res = await fetch(`${url}/api/companies`)

    if (!res.ok) {
      console.error('Failed to fetch data from API')
    }
    const { companies } = await res.json()

    return <CompanyList companies={companies.reverse()} />
  } catch (error) {
    return <Typography variant="text">Error fetching data</Typography>
  }
}


