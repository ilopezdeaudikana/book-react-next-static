// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from '../data';
const companies = data.companies;

export default function handler(req, res) {
  res.status(200).json(companies);
}
