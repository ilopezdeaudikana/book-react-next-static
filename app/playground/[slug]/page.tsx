import { Project } from '../../../components/project/project'
import { url } from '../../url'

export default async function PlaygroundPage({ params }) {
  try {
    const { slug } = await params

    const res = await fetch(`${url}/api/playground/${slug}`)

    if (!res.ok) {
      console.log('Failed to fetch data from API')
    }
    const { project } = await res.json()

    return <Project project={project} />

  } catch (error) {
    return <p>Error fetching data</p>
  }
}

