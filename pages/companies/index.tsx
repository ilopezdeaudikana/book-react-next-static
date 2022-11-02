import { connect } from 'react-redux';
import { END } from 'redux-saga';
import { CompanyList } from '../../components/companies/company-list';
import { fetchCompanies } from '../../store/actions/actions';
import { wrapper } from '../../store/store';

const Companies = ({companies}) => {
  return (
      <CompanyList companies={companies} />
  );
};

export const getStaticProps = wrapper.getStaticProps(
  // @ts-ignore
  (store => async ({preview})  => {
    store.dispatch(fetchCompanies());
    store.dispatch(END);
    await (store as any).companiesTask.toPromise();
    const companies = (store as any).getState().companies;

    return {
      props: companies,
    };
  })
);
export default connect((state) => state)(Companies);


