'use client'

import Image from 'next/image'
import { useBackPath } from '../../app/back-path.provider'
import { Project } from '../../app/types'
import Link from 'next/link'

export const ListItem = ({ item, index, href, isModule, url }: { item: Project, index: number, href?: string, isModule?: boolean, url?: string }) => {
  const { backPath } = useBackPath()
  const dest = href ? 
    href : 
    isModule && url ? 
      url : 
      backPath + '/' + item.id
  
  const target = href ? '_blank' : undefined

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className='project'>
      <div className='panel panel-default'>
        <header className='panel-heading'>
          <h2 className='panel-title teaser'>{item.title}</h2>
        </header>
        <div className='panel-body'>
          <div className='flush'>
            {isModule && url && isDev ? (<a href={dest} target={target}>
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
