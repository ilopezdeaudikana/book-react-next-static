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

  return (
    <nav className='panel-heading page-header'>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='projects'>Projects</Menu.Item>
        <Menu.Item key='companies'>Companies</Menu.Item>
      </Menu>
      {!current && (
        <div className='panel-heading page-header back-button'>
          <Link href='/projects'>
            <a>
              <ArrowLeftOutlined /> Back to projects
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};
