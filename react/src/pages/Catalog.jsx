import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Button, Segmented, Tag, Spin } from 'antd';
import { getProducts } from '../api/products';
import { CartContext } from '../context/CartContext';

const SYRUP_OPTIONS = ['Карамель', 'Яблоко', 'Малина', 'Клубника', 'Лаванда'];

export default function Catalog() {
  const [type, setType] = useState('drink');
  const { addItem } = React.useContext(CartContext);

  const { data: drinks, isLoading: loadingDrinks } = useQuery({ queryKey: ['products', 'drink'], queryFn: () => getProducts({ type: 'drink', limit: 50 }) });
  const { data: desserts, isLoading: loadingDesserts } = useQuery({ queryKey: ['products', 'dessert'], queryFn: () => getProducts({ type: 'dessert', limit: 50 }) });

  const items = useMemo(() => (type === 'drink' ? drinks?.items || [] : desserts?.items || []), [type, drinks, desserts]);

  const [selections, setSelections] = useState({});

  const handleToggleSyrup = (productId, syrup) => {
    setSelections((prev) => {
      const list = prev[productId] || [];
      const exists = list.includes(syrup);
      const next = exists ? list.filter((s) => s !== syrup) : [...list, syrup];
      return { ...prev, [productId]: next };
    });
  };

  const renderSyrups = (product) => {
    const allowed = Array.isArray(product.availableSyrups) && product.availableSyrups.length > 0
      ? SYRUP_OPTIONS.filter((s) => product.availableSyrups.includes(s))
      : SYRUP_OPTIONS;
    const selected = selections[product._id] || [];
    return (
      <div data-easytag="id1-react/src/pages/Catalog.jsx" className="flex flex-wrap gap-2 mt-2">
        {allowed.map((s) => (
          <button
            key={s}
            type="button"
            data-easytag={`id2-react/src/pages/Catalog.jsx-${product._id}-${s}`}
            onClick={() => handleToggleSyrup(product._id, s)}
            className={`px-2 py-1 rounded border ${selected.includes(s) ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200'}`}
          >
            {s}
          </button>
        ))}
      </div>
    );
  };

  const addToCart = (product) => {
    const syrups = selections[product._id] || [];
    addItem(product, 1, { syrups });
  };

  const loading = type === 'drink' ? loadingDrinks : loadingDesserts;

  return (
    <div data-easytag="id3-react/src/pages/Catalog.jsx" className="space-y-4">
      <div data-easytag="id4-react/src/pages/Catalog.jsx" className="flex items-center justify-between">
        <h1 data-easytag="id5-react/src/pages/Catalog.jsx" className="text-2xl font-semibold">Меню</h1>
        <Segmented data-easytag="id6-react/src/pages/Catalog.jsx" options={[{ label: 'Напитки', value: 'drink' }, { label: 'Десерты', value: 'dessert' }]} value={type} onChange={setType} />
      </div>

      {loading && (
        <div data-easytag="id7-react/src/pages/Catalog.jsx" className="flex justify-center py-10"><Spin /></div>
      )}

      {!loading && (
        <div data-easytag="id8-react/src/pages/Catalog.jsx" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <Card
              key={p._id}
              data-easytag={`id9-react/src/pages/Catalog.jsx-${p._id}`}
              title={<div data-easytag={`id10-react/src/pages/Catalog.jsx-${p._id}`}>{p.name}</div>}
              extra={p.isPromo ? <Tag data-easytag={`id11-react/src/pages/Catalog.jsx-${p._id}` } color="green">Акция</Tag> : null}
            >
              <div data-easytag={`id12-react/src/pages/Catalog.jsx-${p._id}`} className="text-gray-600 min-h-[48px]">{p.description}</div>
              <div data-easytag={`id13-react/src/pages/Catalog.jsx-${p._id}`} className="mt-2 font-semibold">{Number(p.price).toFixed(2)} ₽</div>
              {p.type === 'drink' && renderSyrups(p)}
              <div data-easytag={`id14-react/src/pages/Catalog.jsx-${p._id}`} className="mt-4">
                <Button data-easytag={`id15-react/src/pages/Catalog.jsx-${p._id}`} type="primary" block onClick={() => addToCart(p)}>В корзину</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
