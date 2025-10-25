import React from 'react';
import { Form, Input, Button, Typography, Divider, Alert } from 'antd';

const Profile = () => {
  const onSendCode = () => {
    console.log('Send code');
  };
  const onLogin = () => {
    console.log('Login with code');
  };

  return (
    <div data-easytag="id1-react/src/pages/Profile.jsx" className="max-w-xl space-y-6">
      <div data-easytag="id2-react/src/pages/Profile.jsx">
        <Typography.Title data-easytag="id3-react/src/pages/Profile.jsx" level={2} className="!mb-2">Личный кабинет</Typography.Title>
        <Divider data-easytag="id4-react/src/pages/Profile.jsx" className="!my-3" />
      </div>

      <section data-easytag="id5-react/src/pages/Profile.jsx" className="bg-white p-4 rounded-md shadow-sm">
        <Typography.Title data-easytag="id6-react/src/pages/Profile.jsx" level={4}>Вход по телефону</Typography.Title>
        <Form data-easytag="id7-react/src/pages/Profile.jsx" layout="vertical">
          <Form.Item data-easytag="id8-react/src/pages/Profile.jsx" label="Телефон" name="phone" rules={[{ required: true, message: 'Введите телефон' }]}>
            <Input data-easytag="id9-react/src/pages/Profile.jsx" placeholder="+7 900 000-00-00" />
          </Form.Item>
          <div data-easytag="id10-react/src/pages/Profile.jsx" className="flex gap-2">
            <Button data-easytag="id11-react/src/pages/Profile.jsx" onClick={onSendCode} type="default">Получить код</Button>
            <Input data-easytag="id12-react/src/pages/Profile.jsx" placeholder="Код из SMS" className="max-w-[160px]" />
            <Button data-easytag="id13-react/src/pages/Profile.jsx" onClick={onLogin} type="primary">Войти</Button>
          </div>
        </Form>
      </section>

      <section data-easytag="id14-react/src/pages/Profile.jsx" className="bg-white p-4 rounded-md shadow-sm">
        <Typography.Title data-easytag="id15-react/src/pages/Profile.jsx" level={4}>Бонусы</Typography.Title>
        <Alert data-easytag="id16-react/src/pages/Profile.jsx" message="Информация о бонусах появится после авторизации" type="info" showIcon />
      </section>
    </div>
  );
};

export default Profile;
