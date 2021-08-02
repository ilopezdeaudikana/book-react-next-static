import { Company, Project } from '../store/models';

export const getCompanies = async (): Promise<Company[]> => {
  const response: Response = await fetch(`/api/companies`);
  const companies: Company[] = await response.json();
  return companies;
};

export const getProjects = async (): Promise<Project[]> => {
  const response: Response = await fetch(`/api/projects`);
  const projects: Project[] = await response.json();
  return projects;
};

export const getProject = async (id: string): Promise<Project> => {
  const response: Response = await fetch(`/api/projects/${id}`);
  const project: Project = await response.json();
  return project;
};
