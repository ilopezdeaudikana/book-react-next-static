import { useCurrentPath } from './path.hook';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const MenuComponent = (props) => {
  const current = useCurrentPath();
  const router = useRouter();

  const handleClick = (e) => {
    router.push(`/${e.key}`);
  };

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
        key: 'contact',
        label: 'Contact',
      }
    ];

  return (
    <nav className='panel-heading page-header'>
      <Menu 
        onClick={handleClick} 
        selectedKeys={[current]} 
        mode='horizontal' 
        items={menuItems}
      />
        
      {!current && (
        <div className='back-button'>
          <Link href='/projects'>
            <ArrowLeftOutlined />
          </Link>
        </div>
      )}
    </nav>
  );
};
