'use client'
 
import Link from 'next/link'
import Image from 'next/image'
import { useBackPath } from '../../app/back-path.provider'
import { Project } from '../../app/types'

export const ListItem = ({ item, index, href }: { item: Project, index: number, href?: string }) => {
  const { backPath } = useBackPath()
  const dest = href ? href : backPath + '/' + item.id
  const target = href ? '_blanck' : undefined
  return (
    <div className='project'>
      <div className='panel panel-default'>
        <header className='panel-heading'>
          <h2 className='panel-title teaser'>{item.title}</h2>
        </header>
        <div className='panel-body'>
          <div className='flush'>
            <Link href={dest} target={target}>
              <Image
                alt={item.title}
                src={'/images/' + item.teaser}
                width="320"
                height="230"
                className='img-thumbnail'
                loading={index < 4 ? "eager" : "lazy"}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
