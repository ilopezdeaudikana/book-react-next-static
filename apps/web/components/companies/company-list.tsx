
import { Company } from '../../app/types'
import { CompanyListRow } from './company-list-row'

export const CompanyList = ({ companies }) => {

  return (
    <div
      className='companies'
    >
      {companies && companies.map((company: Company) =>
        <CompanyListRow key={company.id} company={company} />
      )}
    </div>
  )
}
