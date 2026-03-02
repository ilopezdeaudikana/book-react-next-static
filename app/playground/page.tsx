import { List } from '../../components/common/list'
import { url } from '../url'

export default async function Playground() {
  try {

    const res = await fetch(`${url}/api/playground`)

    if (!res.ok) {
      console.log('Failed to fetch data from API')
    }
    const { projects } = await res.json()

    return <List items={projects} />

  } catch (error) {
    return <p>Error fetching data</p>
  }
}

