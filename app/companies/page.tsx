import { CompanyList } from '../../components/companies/company-list'

export default async function Companies() {

  try {
    const res = await fetch('/api/companies', { cache: 'no-store' })

    if (!res.ok) {
      console.error('Failed to fetch data from API')
    }
    const { companies } = await res.json()

    return <CompanyList companies={companies} />
  } catch (error) {
    return <p>Error fetching data</p>
  }
}


