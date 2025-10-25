import React from 'react';
import { Card, Button, Tag } from 'antd';

const DEFAULT_SYRUPS = ['Карамель', 'Яблоко', 'Малина', 'Клубника', 'Лаванда'];

export default function ProductCard({ product, selectedSyrups = [], onToggleSyrup, onAddToCart }) {
  const {
    _id,
    name,
    description,
    price,
    isPromo,
    imageUrl,
    nutrition,
    size,
    type,
    availableSyrups,
  } = product || {};

  const allowedSyrups = Array.isArray(availableSyrups) && availableSyrups.length > 0
    ? availableSyrups
    : DEFAULT_SYRUPS;

  const kcal = nutrition && typeof nutrition.kcal !== 'undefined' ? nutrition.kcal : null;
  const proteins = nutrition && typeof nutrition.proteins !== 'undefined' ? nutrition.proteins : null;
  const fats = nutrition && typeof nutrition.fats !== 'undefined' ? nutrition.fats : null;
  const carbs = nutrition && typeof nutrition.carbs !== 'undefined' ? nutrition.carbs : null;

  return (
    <div data-easytag={`id1-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="w-full">
      <Card
        bordered
        className="h-full"
      >
        <div data-easytag={`id2-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="w-full h-36 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          {/* Placeholder image area */}
          <div data-easytag={`id3-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="text-gray-400 text-xs">{imageUrl ? 'Изображение' : 'Плейсхолдер изображения'}</div>
        </div>

        <div data-easytag={`id4-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-3 flex items-start justify-between gap-2">
          <h3 data-easytag={`id5-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="text-base font-semibold text-gray-900">{name}</h3>
          {isPromo ? (
            <span data-easytag={`id6-react/src/components/ProductCard.jsx-${_id || 'unknown'}`}>
              <Tag color="green">Акция</Tag>
            </span>
          ) : null}
        </div>

        <div data-easytag={`id7-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-1 text-gray-600 min-h-[44px]">
          <p data-easytag={`id8-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="leading-snug">{description}</p>
        </div>

        <div data-easytag={`id9-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-2 flex items-center justify-between">
          <strong data-easytag={`id10-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="text-lg text-gray-900">{Number(price || 0).toFixed(2)} ₽</strong>
          {size ? (
            <span data-easytag={`id11-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="text-sm text-gray-500">{size}</span>
          ) : null}
        </div>

        {(kcal !== null || proteins !== null || fats !== null || carbs !== null) ? (
          <div data-easytag={`id12-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-2 text-xs text-gray-500">
            <p data-easytag={`id13-react/src/components/ProductCard.jsx-${_id || 'unknown'}`}>
              Ккал: {kcal !== null ? kcal : '-'}, Б/Ж/У: {proteins !== null ? proteins : '-'} / {fats !== null ? fats : '-'} / {carbs !== null ? carbs : '-'} г
            </p>
          </div>
        ) : (
          <div data-easytag={`id14-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-2 text-xs text-gray-400">
            <p data-easytag={`id15-react/src/components/ProductCard.jsx-${_id || 'unknown'}`}>КБЖУ: —</p>
          </div>
        )}

        {type === 'drink' ? (
          <div data-easytag={`id16-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-3">
            <div data-easytag={`id17-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="text-xs text-gray-500 mb-1">Выберите сиропы:</div>
            <div data-easytag={`id18-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="flex flex-wrap gap-2">
              {allowedSyrups.map((s) => {
                const active = Array.isArray(selectedSyrups) && selectedSyrups.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    data-easytag={`id19-react/src/components/ProductCard.jsx-${_id || 'unknown'}-${s}`}
                    onClick={() => onToggleSyrup && onToggleSyrup(_id, s)}
                    className={`px-2 py-1 rounded border text-sm transition-colors ${active ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div data-easytag={`id20-react/src/components/ProductCard.jsx-${_id || 'unknown'}`} className="mt-4">
          <Button
            data-easytag={`id21-react/src/components/ProductCard.jsx-${_id || 'unknown'}`}
            type="primary"
            block
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            В корзину
          </Button>
        </div>
      </Card>
    </div>
  );
}
