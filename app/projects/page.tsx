import { ProjectList } from '../../components/projects/project-list'

export default async function Projects() {
  try {
    const res = await fetch('/api/projects', { cache: 'no-store' })

    if (!res.ok) {
     console.log('Failed to fetch data from API')
    }
    const { projects } = await res.json()

    return <ProjectList projects={projects} />

  } catch (error) {
    return <p>Error fetching data</p>
  }
}

