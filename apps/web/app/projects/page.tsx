
import { List } from '../../components/common/list'
import { url } from '@repo/ui'

export default async function Projects() {
  try {
    const res = await fetch(`${url}/api/projects`)

    if (!res.ok) {
     console.log('Failed to fetch data from API')
    }
    const { projects } = await res.json()

    return <List items={projects} />

  } catch (error) {
    return <p>Error fetching data</p>
  }
}

