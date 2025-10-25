import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, CoffeeOutlined } from '@ant-design/icons';
import { CartContext } from '../context/CartContext';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const location = useLocation();
  const { items } = React.useContext(CartContext);
  const cartCount = items.reduce((s, it) => s + Number(it.quantity || 0), 0);

  return (
    <Layout data-easytag="id1-react/src/layout/MainLayout.jsx" className="min-h-screen">
      <Header data-easytag="id2-react/src/layout/MainLayout.jsx" className="bg-white shadow-sm px-4">
        <div data-easytag="id3-react/src/layout/MainLayout.jsx" className="max-w-6xl mx-auto flex items-center justify-between">
          <div data-easytag="id4-react/src/layout/MainLayout.jsx" className="flex items-center gap-2 text-lg font-semibold">
            <CoffeeOutlined />
            <Link to="/" data-easytag="id5-react/src/layout/MainLayout.jsx" className="hover:text-blue-600">Easyappz Coffee</Link>
          </div>
          <Menu
            data-easytag="id6-react/src/layout/MainLayout.jsx"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={[
              { key: '/', label: <Link data-easytag="id7-react/src/layout/MainLayout.jsx" to="/">Меню</Link> },
              { key: '/cart', label: (
                <Link data-easytag="id8-react/src/layout/MainLayout.jsx" to="/cart">
                  <Badge data-easytag="id9-react/src/layout/MainLayout.jsx" count={cartCount} size="small" color="#1677ff">
                    <span data-easytag="id10-react/src/layout/MainLayout.jsx"><ShoppingCartOutlined /> Корзина</span>
                  </Badge>
                </Link>
              ) },
              { key: '/profile', label: <Link data-easytag="id11-react/src/layout/MainLayout.jsx" to="/profile"><UserOutlined /> Профиль</Link> },
            ]}
          />
        </div>
      </Header>
      <Content data-easytag="id12-react/src/layout/MainLayout.jsx" className="bg-gray-50">
        <div data-easytag="id13-react/src/layout/MainLayout.jsx" className="max-w-6xl mx-auto p-4">
          <Outlet />
        </div>
      </Content>
      <Footer data-easytag="id14-react/src/layout/MainLayout.jsx" className="text-center bg-white">
        <div data-easytag="id15-react/src/layout/MainLayout.jsx">© {new Date().getFullYear()} Easyappz</div>
      </Footer>
    </Layout>
  );
}
