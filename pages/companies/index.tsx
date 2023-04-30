import { connect } from 'react-redux';
import { END } from 'redux-saga';
import { CompanyList } from '../../components/companies/company-list';
import { fetchCompanies } from '../../store/actions/actions';
import { SagaStore, wrapper } from '../../store/store';

const Companies = ({companies}) => {
  return (
      <CompanyList companies={companies} />
  );
};

export const getStaticProps = wrapper.getStaticProps(
  ((store: SagaStore) => async ()  => {
    store.dispatch(fetchCompanies());
    store.dispatch(END);
    await store.companiesTask.toPromise();
    const companies = store.getState().companies;

    return {
      props: companies,
    };
  })
);
export default connect((state) => state)(Companies);


