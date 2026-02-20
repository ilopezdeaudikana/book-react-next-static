import { Card, Space, Tag, Typography } from 'antd'
import Image from 'next/image'
import { Company } from '../../app/types'

interface CompanyListRowProps {
  company?: Company | null
}

export const CompanyListRow = ({ company }: CompanyListRowProps) => {
  if (!company) {
    return (
      <Card style={{ width: '100%' }}>
        <Typography.Text type='danger'>Error loading company</Typography.Text>
      </Card>
    )
  }

  const {
    id,
    teaser,
    title,
    period,
    job,
    description,
    technologies,
    url,
  } = company

  const links = Array.isArray(url) ? url : [url]
  const techItems = technologies.split(',').map((item) => item.trim()).filter(Boolean)

  return (
    <Card key={id} title={title} className='company-card'>
      <div className='company-card-media'>
        {teaser.map((image: string, index: number) => {
          const href = links[index] ?? links[0]
          const media = (
            <div className='company-card-media-frame'>
              <Image
                alt={title}
                src={'/images/' + image}
                priority
                fill
                sizes='312px'
                style={{ objectFit: 'contain' }}
              />
            </div>
          )

          return href ? (
            <a
              key={image + index}
              href={href}
              target='_blank'
              rel='noreferrer'
              className='company-card-media-link'
            >
              {media}
            </a>
          ) : (
            <div key={image + index}>{media}</div>
          )
        })}
      </div>

      <Space vertical size={4} style={{ width: '100%' }}>
        <Typography.Text strong>{period}</Typography.Text>
        <Typography.Text>Job title: {job}</Typography.Text>
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          Tasks: {description}
        </Typography.Paragraph>
        <div className='company-card-tags'>
          {techItems.map((tech) => (
            <Tag key={tech} color='blue'>
              {tech}
            </Tag>
          ))}
        </div>
      </Space>
    </Card>
  )
}
