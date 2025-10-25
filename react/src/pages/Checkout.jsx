import React, { useMemo, useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, Result, message, Card } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder } from '../api/orders';
import { eWalletMock } from '../api/orders';
import PhoneAuthModal from '../components/PhoneAuthModal';
import { getPublicKey, subscribePush } from '../api/push';

function base64UrlToUint8Array(base64Url) {
  const padLength = (4 - (base64Url.length % 4)) % 4;
  let base64 = base64Url + (padLength === 0 ? '' : (padLength === 2 ? '==' : padLength === 3 ? '=' : '===='));
  base64 = base64.split('-').join('+');
  base64 = base64.split('_').join('/');
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

export default function Checkout() {
  const [form] = Form.useForm();
  const { items, clear, subtotal } = React.useContext(CartContext);
  const { user, token } = React.useContext(AuthContext);
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const navigate = useNavigate();

  const hasDelivery = Form.useWatch('fulfillmentType', form) === 'delivery';

  const payloadItems = useMemo(() => items.map((it) => ({
    productId: it.product?._id,
    quantity: it.quantity,
    options: { syrups: it.options?.syrups || [] },
  })), [items]);

  const handleSubmit = async (values) => {
    if (!token) {
      setAuthOpen(true);
      return;
    }
    if (items.length === 0) {
      message.warning('Корзина пуста');
      return;
    }

    const fulfillmentType = values.fulfillmentType === 'delivery' ? 'delivery' : 'pickup';
    const pickupTime = values.pickupTime ? dayjs(values.pickupTime).toISOString() : null;
    const deliveryAddress = fulfillmentType === 'delivery' ? (values.deliveryAddress || '') : null;
    const paymentMethod = values.paymentMethod === 'e-wallet' ? 'e-wallet' : 'cod';

    const payload = {
      items: payloadItems,
      fulfillmentType,
      pickupTime,
      deliveryAddress,
      paymentMethod,
    };

    try {
      setLoading(true);
      const data = await createOrder(payload);
      const order = data?.order || data;
      if (!order) throw new Error('Не удалось создать заказ');

      if (paymentMethod === 'e-wallet') {
        await eWalletMock({ orderId: order._id, action: 'success' });
      }

      setOrderResult(order);
      message.success('Заказ оформлен успешно');
      clear();

      // Try push subscription after successful order
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.register('/sw.js');
          const existing = await registration.pushManager.getSubscription();
          let subscription = existing;
          if (!subscription) {
            const { publicKey } = await getPublicKey();
            const appServerKey = base64UrlToUint8Array(publicKey);
            subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appServerKey });
          }
          if (subscription) {
            await subscribePush(subscription);
          }
        }
      } catch (e) {
        // ignore push errors
      }
    } catch (e) {
      // errors handled globally
    } finally {
      setLoading(false);
    }
  };

  if (orderResult) {
    return (
      <div data-easytag="id1-react/src/pages/Checkout.jsx" className="max-w-2xl mx-auto">
        <Result
          data-easytag="id2-react/src/pages/Checkout.jsx"
          status="success"
          title="Спасибо! Ваш заказ принят"
          subTitle={`Номер заказа: ${orderResult._id}`}
          extra={[
            <Button data-easytag="id3-react/src/pages/Checkout.jsx" type="primary" key="home" onClick={() => navigate('/')}>Вернуться в меню</Button>,
            <Button data-easytag="id4-react/src/pages/Checkout.jsx" key="profile" onClick={() => navigate('/profile')}>В профиль</Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div data-easytag="id5-react/src/pages/Checkout.jsx" className="max-w-2xl mx-auto">
      <Card data-easytag="id6-react/src/pages/Checkout.jsx" title="Оформление заказа">
        <Form data-easytag="id7-react/src/pages/Checkout.jsx" form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ fulfillmentType: 'pickup', paymentMethod: 'e-wallet' }}>
          <Form.Item label="Способ получения" name="fulfillmentType" rules={[{ required: true, message: 'Выберите способ получения' }]}> 
            <Radio.Group data-easytag="id8-react/src/pages/Checkout.jsx">
              <Radio data-easytag="id9-react/src/pages/Checkout.jsx" value="pickup">Самовывоз</Radio>
              <Radio data-easytag="id10-react/src/pages/Checkout.jsx" value="delivery">Доставка</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Время к которому приготовить" name="pickupTime"> 
            <DatePicker data-easytag="id11-react/src/pages/Checkout.jsx" className="w-full" showTime format="DD.MM.YYYY HH:mm" />
          </Form.Item>

          {hasDelivery && (
            <Form.Item label="Адрес" name="deliveryAddress" rules={[{ required: true, message: 'Укажите адрес доставки' }]}> 
              <Input data-easytag="id12-react/src/pages/Checkout.jsx" placeholder="Город, улица, дом, квартира" />
            </Form.Item>
          )}

          <Form.Item label="Оплата" name="paymentMethod" rules={[{ required: true, message: 'Выберите способ оплаты' }]}> 
            <Radio.Group data-easytag="id13-react/src/pages/Checkout.jsx">
              <Radio data-easytag="id14-react/src/pages/Checkout.jsx" value="e-wallet">Электронные кошельки</Radio>
              <Radio data-easytag="id15-react/src/pages/Checkout.jsx" value="cod">Оплата при получении</Radio>
            </Radio.Group>
          </Form.Item>

          <div data-easytag="id16-react/src/pages/Checkout.jsx" className="flex items-center justify-between">
            <div data-easytag="id17-react/src/pages/Checkout.jsx" className="text-lg">Итого к оплате: <span data-easytag="id18-react/src/pages/Checkout.jsx" className="font-semibold">{subtotal.toFixed(2)} ₽</span></div>
            <Button data-easytag="id19-react/src/pages/Checkout.jsx" type="primary" size="large" loading={loading} htmlType="submit">Оформить заказ</Button>
          </div>
        </Form>
      </Card>

      <PhoneAuthModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={() => {
        // retry submit with current form values
        const values = form.getFieldsValue();
        handleSubmit(values);
      }} />
    </div>
  );
}
