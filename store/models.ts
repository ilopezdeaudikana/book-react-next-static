export interface Action {
  type: string;
  payload: any;
}

export interface Project {
  id: string;
  teaser: string;
  title: string;
}

export interface ProjectDetail {
  id: string;
  projectId: string;
  teaser?: string;
  title: string;
  technologies: string;
  url: string | string[];
  images: string;
}

export interface Company {
  id: string;
  title: string;
  job: string;
  description: string;
  technologies: string;
  url: string[];
  teaser: string[];
  period: string;
  city: string;
}
