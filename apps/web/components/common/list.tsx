'use client'
import { useEffect } from 'react'
import { ListItem } from './list-item'
import { Project } from '../../app/types'
import { useBackPath } from '../../app/back-path.provider'
import { usePathname } from 'next/navigation'
import { isDev } from '../../app/is-dev'

export const List = ({ items }: { items: Project[] }) => {
  const path = usePathname()

  const { setBackPath } = useBackPath()

  useEffect(() => {

    setBackPath(path)

  }, [path])

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
