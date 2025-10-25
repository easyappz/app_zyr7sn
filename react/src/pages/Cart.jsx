import React from 'react';
import { List, Button, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';

const demoItems = [
  { id: '1', name: 'Капучино', qty: 1, price: 220 },
  { id: '2', name: 'Чизкейк', qty: 2, price: 280 },
];

const Cart = () => {
  const subtotal = demoItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div data-easytag="id1-react/src/pages/Cart.jsx" className="grid gap-6 md:grid-cols-3">
      <div data-easytag="id2-react/src/pages/Cart.jsx" className="md:col-span-2">
        <Typography.Title data-easytag="id3-react/src/pages/Cart.jsx" level={2} className="!mb-2">Корзина</Typography.Title>
        <Divider data-easytag="id4-react/src/pages/Cart.jsx" className="!my-3" />
        <List
          data-easytag="id5-react/src/pages/Cart.jsx"
          itemLayout="horizontal"
          dataSource={demoItems}
          renderItem={(item) => (
            <List.Item data-easytag="id6-react/src/pages/Cart.jsx">
              <List.Item.Meta
                data-easytag="id7-react/src/pages/Cart.jsx"
                title={<span data-easytag="id8-react/src/pages/Cart.jsx" className="font-medium">{item.name}</span>}
                description={<span data-easytag="id9-react/src/pages/Cart.jsx">Количество: {item.qty}</span>}
              />
              <div data-easytag="id10-react/src/pages/Cart.jsx" className="font-semibold">{item.price * item.qty} ₽</div>
            </List.Item>
          )}
        />
      </div>

      <aside data-easytag="id11-react/src/pages/Cart.jsx" className="bg-white rounded-md p-4 shadow-sm h-fit">
        <Typography.Title data-easytag="id12-react/src/pages/Cart.jsx" level={4} className="!mt-0">Итого</Typography.Title>
        <div data-easytag="id13-react/src/pages/Cart.jsx" className="flex items-center justify-between py-2">
          <span data-easytag="id14-react/src/pages/Cart.jsx" className="text-gray-600">Сумма</span>
          <span data-easytag="id15-react/src/pages/Cart.jsx" className="font-semibold">{subtotal} ₽</span>
        </div>
        <Divider data-easytag="id16-react/src/pages/Cart.jsx" className="!my-3" />
        <Link data-easytag="id17-react/src/pages/Cart.jsx" to="/checkout">
          <Button data-easytag="id18-react/src/pages/Cart.jsx" type="primary" block>
            Перейти к оформлению
          </Button>
        </Link>
      </aside>
    </div>
  );
};

export default Cart;
