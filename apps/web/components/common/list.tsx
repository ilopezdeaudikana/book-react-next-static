'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ListItem } from './list-item'
import { hydrate } from '../../store/reducers/projects.reducer'
import { Project, Status } from '../../app/types'
import { useBackPath } from '../../app/back-path.provider'
import { usePathname } from 'next/navigation'
import { isDev } from '../../app/is-dev'

export const List = ({ items }: { items: Project[] }) => {
  const path = usePathname()

  const dispatch = useAppDispatch()
  const { setBackPath } = useBackPath()
  const { _, status } = useAppSelector((state) => state[path.replace('/', '')])

  useEffect(() => {
    // If the store is not yet hydrated, dispatch the action to set the value.
    if (status === Status.Idle) {
      dispatch(hydrate(items))
    }
    setBackPath(path)

  }, [dispatch, items, status])
  return (
    <section className='projects'>
      {items && items.map((project, index) => (
        <ListItem 
          key={project.id} 
          item={project} 
          index={index} 
          href={project.isModule && isDev ? undefined : project.url } 
          isModule={project.isModule}
          modulePath={project.modulePath}
        />
      ))}
    </section>
  )
}
