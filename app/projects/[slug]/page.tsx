import { Project } from '../../../components/project/project'


export default async function ProjectPage({ params }) {
  const { slug } = await params
   try {
   const res = await fetch(`http://localhost:3001/api/projects/${slug}`)

    if (!res.ok) {
     throw('Failed to fetch data from API')
    }
    const { project } = await res.json()

    return <Project project={project} />

  } catch (error) {
    return <p>{error} {slug}</p>
  }
}

