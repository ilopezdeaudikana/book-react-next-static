import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CompanyList } from '../../components/companies/company-list';
import { State } from '../../store/store';
import { fetchCompanies } from '../../store/actions/actions';
const Companies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const companies = useSelector((state: State) => state.companies);

  return (
    <Fragment>
      <CompanyList companies={companies} />
    </Fragment>
  );
};

export default Companies;
