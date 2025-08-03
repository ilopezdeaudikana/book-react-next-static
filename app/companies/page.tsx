import { CompanyList } from '../../components/companies/company-list'

export default async function Companies() {

  try {
    const res = await fetch(`http://localhost:3001/api/companies`)

    if (!res.ok) {
      throw ('Failed to fetch data from API')
    }
    const { companies } = await res.json()

    return <CompanyList companies={companies} />
  } catch (error) {
    return <p>{error}</p>
  }
}


