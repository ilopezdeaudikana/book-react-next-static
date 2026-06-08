'use client'
import { Avatar, Menu, Popover, type MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { UserOutlined } from '@ant-design/icons'
import { Typography } from '../typography'

import styles from './header.module.css'

interface HeaderProps {
  onNavigate: (path: string) => void
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const mainPaths = ['projects', 'companies', 'playground', 'contact']

  const menuItems = [
    {
      key: 'projects',
      label: 'Side projects',
    },
    {
      key: 'companies',
      label: 'Companies',
    },
    {
      key: 'playground',
      label: 'Playground',
    },
  ]

  const pathName = usePathname()

  const [current, setCurrent] = useState('playground')
  const [open, openMenu] = useState(false)

  const handleClicks: MenuProps['onClick'] = (e) => {
    onNavigate(e.key)
    setCurrent(e.key)
  }

  const handleOpenChange = () => {
    openMenu((isOpen) => !isOpen)
  }

  useEffect(() => {
    const path = pathName?.replace('/', '')
    if (mainPaths.find((item) => item === path) && path !== 'playground') {
      setCurrent(path)
    }
  }, [pathName])

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <Menu
          onClick={handleClicks}
          mode="horizontal"
          items={menuItems}
          selectedKeys={[current]}
        />
      </nav>
      <div className={styles.avatar}>
        <Popover
          title="Find me on:"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
          content={
            <div className={styles.contextMenu}>
              <Typography
                variant="link"
                href="https://www.linkedin.com/in/iker-lopez-de-audikana-690441ab/"
                target="_blank"
              >
                LinkedIn
              </Typography>
              <Typography
                variant="link"
                href="https://github.com/ilopezdeaudikana"
                target="_blank"
              >
                Github
              </Typography>
            </div>
          }
        >
          <Avatar icon={<UserOutlined />} />
        </Popover>
      </div>
    </div>
  )
}
