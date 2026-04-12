import { Typography } from '@repo/ui'
import { Project } from '../../../components/project/project'
import { url } from '@repo/utils'

export default async function ProjectPage({ params }) {
  try {
    const { slug } = await params

    const res = await fetch(`${url}/api/projects/${slug}`)

    if (!res.ok) {
      console.log('Failed to fetch data from API')
    }
    const { project } = await res.json()

    return <Project project={project} />

  } catch (error) {
    return <Typography variant="text">Error fetching data</Typography>
  }
}

