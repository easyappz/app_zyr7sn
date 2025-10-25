import React from 'react';
import { Button, InputNumber, List, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { items, updateItem, removeItem, clear, subtotal } = React.useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div data-easytag="id1-react/src/pages/Cart.jsx" className="space-y-4">
      <div data-easytag="id2-react/src/pages/Cart.jsx" className="flex items-center justify-between">
        <h1 data-easytag="id3-react/src/pages/Cart.jsx" className="text-2xl font-semibold">Корзина</h1>
        {items.length > 0 && (
          <Button data-easytag="id4-react/src/pages/Cart.jsx" danger onClick={clear}>Очистить</Button>
        )}
      </div>

      {items.length === 0 ? (
        <div data-easytag="id5-react/src/pages/Cart.jsx" className="py-10">
          <Empty data-easytag="id6-react/src/pages/Cart.jsx" description="Корзина пуста" />
        </div>
      ) : (
        <div data-easytag="id7-react/src/pages/Cart.jsx" className="grid grid-cols-1 gap-4">
          <List
            data-easytag="id8-react/src/pages/Cart.jsx"
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => (
              <List.Item data-easytag={`id9-react/src/pages/Cart.jsx-${index}`} actions={[
                <div key="qty" data-easytag={`id10-react/src/pages/Cart.jsx-${index}`} className="flex items-center gap-2">
                  <span data-easytag={`id11-react/src/pages/Cart.jsx-${index}`}>Кол-во:</span>
                  <InputNumber
                    data-easytag={`id12-react/src/pages/Cart.jsx-${index}`}
                    min={1}
                    value={item.quantity}
                    onChange={(val) => updateItem(index, { quantity: Number(val || 1) })}
                  />
                </div>,
                <Button key="remove" data-easytag={`id13-react/src/pages/Cart.jsx-${index}`} danger onClick={() => removeItem(index)}>Удалить</Button>
              ]}>
                <List.Item.Meta
                  data-easytag={`id14-react/src/pages/Cart.jsx-${index}`}
                  title={
                    <div data-easytag={`id15-react/src/pages/Cart.jsx-${index}`} className="flex items-center justify-between">
                      <span data-easytag={`id16-react/src/pages/Cart.jsx-${index}`}>{item.product?.name}</span>
                      <span data-easytag={`id17-react/src/pages/Cart.jsx-${index}`} className="font-semibold">{(Number(item.product?.price) * Number(item.quantity)).toFixed(2)} ₽</span>
                    </div>
                  }
                  description={
                    <div data-easytag={`id18-react/src/pages/Cart.jsx-${index}`} className="text-gray-600">
                      {item.options?.syrups?.length ? `Сиропы: ${item.options.syrups.join(', ')}` : 'Без сиропов'}
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <div data-easytag="id19-react/src/pages/Cart.jsx" className="flex items-center justify-between border-t pt-4">
            <div data-easytag="id20-react/src/pages/Cart.jsx" className="text-lg">Итого: <span data-easytag="id21-react/src/pages/Cart.jsx" className="font-semibold">{subtotal.toFixed(2)} ₽</span></div>
            <Button data-easytag="id22-react/src/pages/Cart.jsx" type="primary" size="large" onClick={() => navigate('/checkout')}>Перейти к оформлению</Button>
          </div>
        </div>
      )}
    </div>
  );
}
