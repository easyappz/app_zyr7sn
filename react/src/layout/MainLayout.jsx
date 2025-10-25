import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const location = useLocation();

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith('/cart')) return ['/cart'];
    if (location.pathname.startsWith('/profile')) return ['/profile'];
    if (location.pathname.startsWith('/checkout')) return ['/cart'];
    return ['/'];
  }, [location.pathname]);

  return (
    <Layout data-easytag="id1-react/src/layout/MainLayout.jsx" className="min-h-screen">
      <Header data-easytag="id2-react/src/layout/MainLayout.jsx" className="bg-white shadow-sm">
        <div data-easytag="id3-react/src/layout/MainLayout.jsx" className="max-w-6xl mx-auto flex items-center justify-between">
          <div data-easytag="id4-react/src/layout/MainLayout.jsx" className="text-xl font-semibold text-gray-900 tracking-tight">
            <Link to="/" data-easytag="id5-react/src/layout/MainLayout.jsx" className="hover:text-primary">Easyappz • Кофейня</Link>
          </div>
          <nav data-easytag="id6-react/src/layout/MainLayout.jsx">
            <Menu
              data-easytag="id7-react/src/layout/MainLayout.jsx"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={[
                {
                  key: '/',
                  label: <Link data-easytag="id8-react/src/layout/MainLayout.jsx" to="/" className="px-2">Каталог</Link>,
                  icon: <HomeOutlined />,
                },
                {
                  key: '/cart',
                  label: <Link data-easytag="id9-react/src/layout/MainLayout.jsx" to="/cart" className="px-2">Корзина</Link>,
                  icon: <ShoppingCartOutlined />,
                },
                {
                  key: '/profile',
                  label: <Link data-easytag="id10-react/src/layout/MainLayout.jsx" to="/profile" className="px-2">Профиль</Link>,
                  icon: <UserOutlined />,
                },
              ]}
            />
          </nav>
        </div>
      </Header>
      <Content data-easytag="id11-react/src/layout/MainLayout.jsx" className="bg-gray-50">
        <div data-easytag="id12-react/src/layout/MainLayout.jsx" className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </Content>
      <Footer data-easytag="id13-react/src/layout/MainLayout.jsx" className="text-center text-gray-500 bg-white">
        <div data-easytag="id14-react/src/layout/MainLayout.jsx">© {new Date().getFullYear()} Easyappz • Минималистичный UI</div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
