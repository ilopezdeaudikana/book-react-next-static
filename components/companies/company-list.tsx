
import { Company } from '../../store/models';
import {CompanyListRow} from './company-list-row';

export const CompanyList = ({ companies }) => {
  return (
    <section className="companies">
      {companies.reverse().map((company: Company) =>
        <CompanyListRow key={company.id} company={company} />
      )}
    </section>
  );
};