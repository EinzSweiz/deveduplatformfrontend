'use client';
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { resetCookies } from '@/app/lib/actions';

const { Sider, Content } = Layout;

interface NavbarProps {
  userId?: string | null
}

const UserNavbar: React.FC<NavbarProps> = ({userId}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
 

  const handleLogout = async () => {
    try {
      await resetCookies()
      router.push('/')

    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  const items = [
    {
      key: '1',
      icon: <PieChartOutlined/>,
      label: 'Dashboard',
      route: '/', // Define route for this item
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'My Lessons',
      route: '/mylessons', // Define route for this item
    },
    {
      key: 'sub1',
      icon: <UserOutlined />,
      label: 'User',
      children: userId
        ? [
            { key: '3', label: 'Profile', route: '/profile' },
            { key: '4', label: 'My Lessons', route: '/user/tom' },
            { key: '5', label: 'My Messages', route: '/user/bill' },
            { key: '6', label: 'My Exams', route: '/user/alex' },
            { key: '7', label: 'Logout', onClick: handleLogout },
          ]
        : [
            { key: '3', label: 'Login', route: '/auth/login' },
            { key: '4', label: 'Register', route: '/auth/register' },
            { key: '5', label: 'Contact Us', route: '/guest/alex' },
          ],
    },
    {
      key: 'sub2',
      icon: <TeamOutlined />,
      label: 'Courses',
      children: [
        { key: '8', label: 'Create Course', route: '/course_create' },
        { key: '9', label: 'My Courses', route: '/team/team2' },
      ],
    },
    {
      key: '10',
      icon: <FileOutlined />,
      label: 'Files',
      route: '/files', // Define route for this item
    },
  ];
  
  const handleMenuClick = (e: any) => {
    const item = findMenuItem(items, e.key);
    if (item?.route) {
      router.push(item.route);
      setCollapsed(true);
    }
  };

  // Helper function to find menu item by key
  const findMenuItem = (menuItems: any[], key: string): any => {
    for (const item of menuItems) {
      if (item.key === key) return item;
      if (item.children) {
        const childItem = findMenuItem(item.children, key);
        if (childItem) return childItem;
      }
    }
    return null;
  };

  return (
    <>
      <section>
        <div className='container'>
          <div className="fixed top-0 left-0 z-50 h-[100px] flex transition">
            <Layout
              style={{
                minHeight: '100vh',
                maxWidth: collapsed ? '5vh' : '22vh',
                transition: 'all 0.1s ease-in-out',
              }}
            >
              {/* Sidebar */}
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                  background: '#001529',
                  transition: 'width 2s ease-in-out', 
                }}
                width={250}
                collapsedWidth={80}
              >
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  items={items}
                  onClick={handleMenuClick} // Handle menu item clicks
                />
              </Sider>

              <Content
                style={{
                  backgroundColor: '#ffffff',
                  transition: 'margin-left 2s ease-in-out',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    height: '100%',
                  }}
                />
              </Content>
            </Layout>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserNavbar;
