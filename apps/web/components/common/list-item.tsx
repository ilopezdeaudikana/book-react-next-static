'use client'

import Image from 'next/image'
import { useBackPath } from '../../app/back-path.provider'
import { Project } from '../../app/types'
import Link from 'next/link'
import { isDev } from '../../app/is-dev'

export const ListItem = ({ item, index, href, isModule, modulePath }: { item: Project, index: number, href?: string, isModule?: boolean, modulePath?: string }) => {
  const { backPath } = useBackPath()
  const dest = href ? 
    href : 
    isModule && modulePath ? 
      modulePath : 
      backPath + '/' + item.id
  
  const target = href && !isModule ? '_blank' : undefined

  return (
    <div className='project'>
      <div className='panel panel-default'>
        <header className='panel-heading'>
          <h2 className='panel-title teaser'>{item.title}</h2>
        </header>
        <div className='panel-body'>
          <div className='flush'>
            {isModule && modulePath && isDev ? (<a href={dest} target={target}>
              <Image
                alt={item.title}
                src={'/images/' + item.teaser}
                width="320"
                height="230"
                className='img-thumbnail'
                loading={index < 4 ? "eager" : "lazy"}
              />
            </a>)
            : (<Link href={dest} target={target}>
              <Image
                alt={item.title}
                src={'/images/' + item.teaser}
                width="320"
                height="230"
                className='img-thumbnail'
                loading={index < 4 ? "eager" : "lazy"}
              />
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}
