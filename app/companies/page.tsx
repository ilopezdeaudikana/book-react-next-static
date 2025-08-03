import { CompanyList } from '../../components/companies/company-list'

export default async function Companies() {

  try {
    const res = await fetch(`http://localhost:3001/api/companies`)

    const { companies } = await res.json()

    if (!res.ok || !companies) {
      throw ('Failed to fetch data from API')
    }
    return <CompanyList companies={companies} />
  } catch (error) {
    return <p>{error}</p>
  }
}


