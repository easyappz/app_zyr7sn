import React, { useMemo, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Segmented, Checkbox, Spin, Alert } from 'antd';
import { getProducts } from '../api/products';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [tab, setTab] = useState('coffee'); // 'coffee' | 'drinks' | 'desserts'
  const [popularOnly, setPopularOnly] = useState(false);
  const { addItem } = useContext(CartContext);

  const { data: coffeeData, isLoading: loadingCoffee, error: errorCoffee } = useQuery({
    queryKey: ['products', 'coffee', popularOnly],
    queryFn: () => getProducts({ type: 'drink', category: 'coffee', limit: 50, sort: 'name', ...(popularOnly ? { popular: true } : {}) }),
  });

  const { data: drinksData, isLoading: loadingDrinks, error: errorDrinks } = useQuery({
    queryKey: ['products', 'drinks', popularOnly],
    queryFn: () => getProducts({ type: 'drink', limit: 50, sort: 'name', ...(popularOnly ? { popular: true } : {}) }),
  });

  const { data: dessertsData, isLoading: loadingDesserts, error: errorDesserts } = useQuery({
    queryKey: ['products', 'desserts', popularOnly],
    queryFn: () => getProducts({ type: 'dessert', limit: 50, sort: 'name', ...(popularOnly ? { popular: true } : {}) }),
  });

  const items = useMemo(() => {
    if (tab === 'coffee') return coffeeData?.items || [];
    if (tab === 'drinks') {
      const list = drinksData?.items || [];
      // Exclude coffee subcategory on client if present
      return list.filter((p) => {
        if (typeof p?.category === 'string') {
          return p.category !== 'coffee';
        }
        return true;
      });
    }
    return dessertsData?.items || [];
  }, [tab, coffeeData, drinksData, dessertsData]);

  const [selections, setSelections] = useState({});

  const handleToggleSyrup = (productId, syrup) => {
    setSelections((prev) => {
      const list = prev[productId] || [];
      const exists = list.includes(syrup);
      const next = exists ? list.filter((s) => s !== syrup) : [...list, syrup];
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product) => {
    const syrups = selections[product._id] || [];
    addItem(product, 1, { syrups });
  };

  const loading = tab === 'coffee' ? loadingCoffee : tab === 'drinks' ? loadingDrinks : loadingDesserts;
  const error = tab === 'coffee' ? errorCoffee : tab === 'drinks' ? errorDrinks : errorDesserts;

  return (
    <div data-easytag="id1-react/src/pages/Catalog.jsx" className="space-y-4">
      <div data-easytag="id2-react/src/pages/Catalog.jsx" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 data-easytag="id3-react/src/pages/Catalog.jsx" className="text-2xl font-semibold">Каталог</h1>
        <div data-easytag="id4-react/src/pages/Catalog.jsx" className="flex items-center gap-3">
          <div data-easytag="id5-react/src/pages/Catalog.jsx" className="min-w-[240px]">
            <Segmented
              data-easytag="id6-react/src/pages/Catalog.jsx"
              options={[
                { label: 'Кофе', value: 'coffee' },
                { label: 'Напитки', value: 'drinks' },
                { label: 'Десерты', value: 'desserts' },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>
          <label data-easytag="id7-react/src/pages/Catalog.jsx" className="inline-flex items-center gap-2 select-none">
            <Checkbox
              data-easytag="id8-react/src/pages/Catalog.jsx"
              checked={popularOnly}
              onChange={(e) => setPopularOnly(e.target.checked)}
            />
            <span data-easytag="id9-react/src/pages/Catalog.jsx" className="text-sm text-gray-700">Популярное</span>
          </label>
        </div>
      </div>

      {error ? (
        <div data-easytag="id10-react/src/pages/Catalog.jsx" className="py-4">
          <Alert
            data-easytag="id11-react/src/pages/Catalog.jsx"
            type="error"
            message="Ошибка загрузки каталога"
            description="Пожалуйста, попробуйте обновить страницу или зайдите позже."
            showIcon
          />
        </div>
      ) : null}

      {loading ? (
        <div data-easytag="id12-react/src/pages/Catalog.jsx" className="flex justify-center py-10"><Spin /></div>
      ) : (
        <div data-easytag="id13-react/src/pages/Catalog.jsx" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <div data-easytag={`id14-react/src/pages/Catalog.jsx-${p._id}`} key={p._id} className="">
              <ProductCard
                product={p}
                selectedSyrups={selections[p._id] || []}
                onToggleSyrup={handleToggleSyrup}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
          {items.length === 0 && (
            <div data-easytag="id15-react/src/pages/Catalog.jsx" className="col-span-full text-center text-gray-500 py-10">Нет товаров для отображения</div>
          )}
        </div>
      )}
    </div>
  );
}
