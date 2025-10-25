import React, { useState } from 'react';
import { Form, Radio, DatePicker, Input, Divider, Button, Typography } from 'antd';
import dayjs from 'dayjs';

const Checkout = () => {
  const [type, setType] = useState('pickup');

  const onFinish = (values) => {
    console.log('Order draft', values);
  };

  return (
    <div data-easytag="id1-react/src/pages/Checkout.jsx" className="max-w-2xl">
      <Typography.Title data-easytag="id2-react/src/pages/Checkout.jsx" level={2} className="!mb-2">Оформление заказа</Typography.Title>
      <Divider data-easytag="id3-react/src/pages/Checkout.jsx" className="!my-3" />

      <Form data-easytag="id4-react/src/pages/Checkout.jsx" layout="vertical" onFinish={onFinish} initialValues={{ fulfillmentType: 'pickup', paymentMethod: 'e-wallet', pickupTime: dayjs() }}>
        <Form.Item data-easytag="id5-react/src/pages/Checkout.jsx" label="Способ получения" name="fulfillmentType">
          <Radio.Group data-easytag="id6-react/src/pages/Checkout.jsx" onChange={(e) => setType(e.target.value)}>
            <Radio data-easytag="id7-react/src/pages/Checkout.jsx" value="pickup">Самовывоз</Radio>
            <Radio data-easytag="id8-react/src/pages/Checkout.jsx" value="delivery">Доставка</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item data-easytag="id9-react/src/pages/Checkout.jsx" label="Время готовности" name="pickupTime">
          <DatePicker data-easytag="id10-react/src/pages/Checkout.jsx" className="w-full" showTime format="DD.MM.YYYY HH:mm" />
        </Form.Item>

        {type === 'delivery' && (
          <Form.Item data-easytag="id11-react/src/pages/Checkout.jsx" label="Адрес доставки" name="deliveryAddress" rules={[{ required: true, message: 'Укажите адрес' }]}> 
            <Input data-easytag="id12-react/src/pages/Checkout.jsx" placeholder="Город, улица, дом, квартира" />
          </Form.Item>
        )}

        <Form.Item data-easytag="id13-react/src/pages/Checkout.jsx" label="Способ оплаты" name="paymentMethod">
          <Radio.Group data-easytag="id14-react/src/pages/Checkout.jsx">
            <Radio data-easytag="id15-react/src/pages/Checkout.jsx" value="e-wallet">Электронные кошельки</Radio>
            <Radio data-easytag="id16-react/src/pages/Checkout.jsx" value="cod">Оплата при получении</Radio>
          </Radio.Group>
        </Form.Item>

        <Divider data-easytag="id17-react/src/pages/Checkout.jsx" />

        <Button data-easytag="id18-react/src/pages/Checkout.jsx" type="primary" htmlType="submit">
          Подтвердить заказ
        </Button>
      </Form>
    </div>
  );
};

export default Checkout;
