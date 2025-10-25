import React from 'react';
import { Typography, Divider, Card, Button, Checkbox, Row, Col, Tag } from 'antd';

const syrups = ['Ваниль', 'Карамель', 'Орех', 'Мята'];

const drinks = [
  { id: 'd1', name: 'Эспрессо', desc: 'Классический насыщенный вкус', price: 150 },
  { id: 'd2', name: 'Капучино', desc: 'Молочная пена и баланс', price: 220 },
  { id: 'd3', name: 'Латте', desc: 'Мягко и сливочно', price: 230 },
];

const desserts = [
  { id: 's1', name: 'Чизкейк', desc: 'Лёгкий ванильный', price: 280 },
  { id: 's2', name: 'Макарон', desc: 'Воздушный десерт', price: 120 },
];

const Catalog = () => {
  return (
    <div data-easytag="id1-react/src/pages/Catalog.jsx" className="space-y-10">
      <section data-easytag="id2-react/src/pages/Catalog.jsx">
        <div data-easytag="id3-react/src/pages/Catalog.jsx" className="flex items-center justify-between">
          <Typography.Title data-easytag="id4-react/src/pages/Catalog.jsx" level={2} className="!mb-1">Напитки</Typography.Title>
          <Tag data-easytag="id5-react/src/pages/Catalog.jsx" color="blue">выберите сиропы при необходимости</Tag>
        </div>
        <Divider data-easytag="id6-react/src/pages/Catalog.jsx" className="!my-3" />
        <Row data-easytag="id7-react/src/pages/Catalog.jsx" gutter={[16, 16]}>
          {drinks.map((item) => (
            <Col data-easytag="id8-react/src/pages/Catalog.jsx" key={item.id} xs={24} sm={12} md={8}>
              <Card data-easytag="id9-react/src/pages/Catalog.jsx" className="h-full" title={item.name} bordered>
                <div data-easytag="id10-react/src/pages/Catalog.jsx" className="text-gray-600 mb-3">{item.desc}</div>
                <div data-easytag="id11-react/src/pages/Catalog.jsx" className="text-sm text-gray-500 mb-2">Сиропы (по желанию):</div>
                <Checkbox.Group data-easytag="id12-react/src/pages/Catalog.jsx" options={syrups} className="flex flex-wrap gap-2 mb-4" />
                <div data-easytag="id13-react/src/pages/Catalog.jsx" className="flex items-center justify-between">
                  <div data-easytag="id14-react/src/pages/Catalog.jsx" className="text-lg font-semibold">{item.price} ₽</div>
                  <Button data-easytag="id15-react/src/pages/Catalog.jsx" type="primary">Добавить в корзину</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section data-easytag="id16-react/src/pages/Catalog.jsx">
        <Typography.Title data-easytag="id17-react/src/pages/Catalog.jsx" level={2} className="!mb-1">Десерты</Typography.Title>
        <Divider data-easytag="id18-react/src/pages/Catalog.jsx" className="!my-3" />
        <Row data-easytag="id19-react/src/pages/Catalog.jsx" gutter={[16, 16]}>
          {desserts.map((item) => (
            <Col data-easytag="id20-react/src/pages/Catalog.jsx" key={item.id} xs={24} sm={12} md={8}>
              <Card data-easytag="id21-react/src/pages/Catalog.jsx" className="h-full" title={item.name} bordered>
                <div data-easytag="id22-react/src/pages/Catalog.jsx" className="text-gray-600 mb-4">{item.desc}</div>
                <div data-easytag="id23-react/src/pages/Catalog.jsx" className="flex items-center justify-between">
                  <div data-easytag="id24-react/src/pages/Catalog.jsx" className="text-lg font-semibold">{item.price} ₽</div>
                  <Button data-easytag="id25-react/src/pages/Catalog.jsx" type="primary">Добавить в корзину</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Catalog;
