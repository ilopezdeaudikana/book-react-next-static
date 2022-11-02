import { Company, Project } from '../store/models';

const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:3001' : 'https://boiling-hollows-34647.herokuapp.com';

export const getCompanies = async (): Promise<Company[]> => {
  const response: Response = await fetch(`${server}/api/companies`);
  const companies: Company[] = await response.json();
  return companies;
};

export const getProjects = async (): Promise<Project[]> => {
  const response: Response = await fetch(`${server}/api/projects`);
  const projects: Project[] = await response.json();
  return projects;
};

export const getProject = async (id: string): Promise<Project> => {
  const response: Response = await fetch(`${server}/api/projects/${id}`);
  const project: Project = await response.json();
  return project;
};
