import React, { useState } from 'react';
import { Modal, Form, Input, Button, Space, message } from 'antd';
import { sendOtp, verifyOtp } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

export default function PhoneAuthModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setAuth } = React.useContext(AuthContext);
  const [phone, setPhone] = useState('');

  const handleSend = async () => {
    try {
      const values = await form.validateFields(['phone']);
      setLoading(true);
      await sendOtp(values.phone);
      setPhone(values.phone);
      setStep('code');
      message.success('Код отправлен');
    } catch (e) {
      // validation or api error handled by interceptors
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      const values = await form.validateFields(['code']);
      setLoading(true);
      const data = await verifyOtp(phone, values.code);
      const token = data?.token;
      const user = data?.user || null;
      if (token) {
        setAuth(token, user);
        message.success('Вы успешно вошли');
        if (onSuccess) onSuccess(user);
        if (onClose) onClose();
      }
    } catch (e) {
      // errors handled globally
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      data-easytag="id1-react/src/components/PhoneAuthModal.jsx"
      title="Вход по номеру телефона"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form data-easytag="id2-react/src/components/PhoneAuthModal.jsx" layout="vertical" form={form}>
        {step === 'phone' && (
          <div data-easytag="id3-react/src/components/PhoneAuthModal.jsx">
            <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введите номер телефона' }]}> 
              <Input data-easytag="id4-react/src/components/PhoneAuthModal.jsx" placeholder="+7XXXXXXXXXX" />
            </Form.Item>
            <Space data-easytag="id5-react/src/components/PhoneAuthModal.jsx" className="w-full flex justify-end">
              <Button data-easytag="id6-react/src/components/PhoneAuthModal.jsx" type="primary" loading={loading} onClick={handleSend}>Отправить код</Button>
            </Space>
          </div>
        )}
        {step === 'code' && (
          <div data-easytag="id7-react/src/components/PhoneAuthModal.jsx">
            <Form.Item name="code" label="Код из SMS" rules={[{ required: true, message: 'Введите код' }]}> 
              <Input data-easytag="id8-react/src/components/PhoneAuthModal.jsx" placeholder="XXXX" />
            </Form.Item>
            <Space data-easytag="id9-react/src/components/PhoneAuthModal.jsx" className="w-full flex justify-between">
              <Button data-easytag="id10-react/src/components/PhoneAuthModal.jsx" onClick={() => setStep('phone')}>Назад</Button>
              <Button data-easytag="id11-react/src/components/PhoneAuthModal.jsx" type="primary" loading={loading} onClick={handleVerify}>Войти</Button>
            </Space>
          </div>
        )}
      </Form>
    </Modal>
  );
}
