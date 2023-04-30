import data from '../data';
const records = data.records;

export default function handler(req, res) {
  const record = records.find((record) => record.proyectos_id === req.query.id);
  res.status(200).json(record);
}
