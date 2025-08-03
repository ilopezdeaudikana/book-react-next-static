import { Project } from '../../../components/project/project'


export default async function ProjectPage({ params }) {
  try {
    const { slug } = await params

    const res = await fetch(`/api/projects/${slug}`, { cache: 'no-store' })

    if (!res.ok) {
      console.log('Failed to fetch data from API')
    }
    const { project } = await res.json()

    return <Project project={project} />

  } catch (error) {
    return <p>Error fetching data</p>
  }
}

