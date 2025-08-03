import { ProjectList } from '../../components/projects/project-list'

export default async function Projects() {
  try {
    const res = await fetch('http://localhost:3001/api/projects')

    if (!res.ok) {
     throw('Failed to fetch data from API')
    }
    const { projects } = await res.json()

    return <ProjectList projects={projects} />

  } catch (error) {
    return <p>{error}</p>
  }
}

