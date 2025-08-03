
'use client'
import { Company } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CompanyListRow } from './company-list-row';
import { hydrate } from '../../store/reducers/companies.reducer'
import { Status } from '../../app/types'
export const CompanyList = ({ companies }) => {
  const dispatch = useAppDispatch()
  const { value, status } = useAppSelector((state) => state.companies)

  useEffect(() => {
    // If the store is not yet hydrated, dispatch the action to set the value.
    if (status === Status.Idle) {
      dispatch(hydrate(companies))
    }
  }, [dispatch, companies, status])
  return (
    <section className="companies">
      {companies && companies.reverse().map((company: Company) =>
        <CompanyListRow key={company.id} company={company} />
      )}
    </section>
  )
}

function useEffect(arg0: () => void, arg1: any[]) {
  throw new Error('Function not implemented.')
}
