
'use client'
import { Company } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CompanyListRow } from './company-list-row';
import { hydrate } from '../../store/reducers/companies.reducer'
import { Status } from '../../app/types'
import { useEffect } from 'react'
export const CompanyList = ({ companies }) => {
  const dispatch = useAppDispatch()
  const { value, status } = useAppSelector((state) => state.companies)

  useEffect(() => {
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

