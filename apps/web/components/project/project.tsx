'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Modal } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Typography } from '@repo/ui'

export const Project = ({ project }) => {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')

  const showModal = (image: string) => {
    setModalImage(image)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setModalImage('')
    setIsModalVisible(false)
  }

  return (
    <section className='project standalone'>
      {!project && <div>Loading projects...</div>}
      {project && (
        <div className='panel panel-default'>
          <header className='panel-heading'>
            <div className='back-button'>
              <Link href='/projects'>
                <ArrowLeftOutlined />
              </Link>
            </div>
            <div>
              <h1 className='panel-title'>{project.title}</h1>
              <Typography variant="text">
                <span>Stack</span>: {project.technologies}
              </Typography>
            </div>
          </header>

          <div className='panel-body'>
            {project.images?.split(',').map((image, index) => (
              <div
                key={index}
                className='flush'
                onClick={() => showModal(image)}
              >
                <Image
                  src={'/images/mini/' + image}
                  alt={project.title}
                  width='320'
                  height='230'
                />
              </div>
            ))}
            <Modal
              title={project.title}
              open={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              width={600}
            >
              <Image
                src={'/images/' + modalImage}
                alt={project.title}
                width='552'
                height='368'
              />
            </Modal>
          </div>
        </div>
      )}
    </section>
  )
}

