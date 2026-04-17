'use client'
import { Menu, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  onNavigate: (path: string) => void
}

export const Header = ({ onNavigate }: HeaderProps) => {

  const mainPaths = ['projects', 'companies', 'playground', 'contact']

  const menuItems = [
    {
      key: 'projects',
      label: 'Projects',
    },
    {
      key: 'companies',
      label: 'Companies',
    },
    {
      key: 'playground',
      label: 'Playground',
    },
    {
      key: 'contact',
      label: 'Contact'
    }
  ]

  const pathName = usePathname()

  const [current, setCurrent] = useState('playground')

  const handleClicks: MenuProps['onClick'] = (e) => {
    onNavigate(e.key)
    setCurrent(e.key)
  }

  useEffect(() => {

    const path = pathName.replace('/', '')
    if (mainPaths.find((item) => item === path) && path !== 'playground') {
      setCurrent(path)
    }
  }, [pathName])

  return (
    <nav style={{ width: 'stretch' }}>
      <Menu
        onClick={handleClicks}
        mode='horizontal'
        items={menuItems}
        selectedKeys={[current]}
      />
    </nav>
  )
}
