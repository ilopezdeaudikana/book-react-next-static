

import { Menu } from 'antd'
// import { ArrowLeftOutlined } from '@ant-design/icons'


interface HeaderProps {
  onNavigate: (path: string) => void
}

export const Header = ({ onNavigate }: HeaderProps) => {

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
      label: 'Contact',
    }
  ]

  return (
    <nav style={{ width: 'stretch' }}>
      <Menu
        onClick={(e) => onNavigate(e.key)}
        mode='horizontal'
        items={menuItems}
      />

      {/* {!current && (
        <div className='back-button'>
          <Link href='/projects'>
            <ArrowLeftOutlined />
          </Link>
        </div>
      )} */}
    </nav>
  )
}
