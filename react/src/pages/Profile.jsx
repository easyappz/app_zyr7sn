import React, { useEffect } from 'react';
import { Button, Card, Descriptions, Result, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getBonusSummary } from '../api/bonus';
import { AuthContext } from '../context/AuthContext';
import PhoneAuthModal from '../components/PhoneAuthModal';

export default function Profile() {
  const { user, logout } = React.useContext(AuthContext);
  const [authOpen, setAuthOpen] = React.useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bonus-summary'],
    queryFn: getBonusSummary,
    enabled: !!user,
  });

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  const handleEnablePush = async () => {
    if (typeof window.easyappzRequestPush === 'function') {
      await window.easyappzRequestPush();
    }
  };

  if (!user) {
    return (
      <div data-easytag="id1-react/src/pages/Profile.jsx" className="max-w-xl mx-auto">
        <Result
          data-easytag="id2-react/src/pages/Profile.jsx"
          title="Войдите, чтобы увидеть профиль"
          extra={<Button data-easytag="id3-react/src/pages/Profile.jsx" type="primary" onClick={() => setAuthOpen(true)}>Войти</Button>}
        />
        <PhoneAuthModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={() => setAuthOpen(false)} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div data-easytag="id4-react/src/pages/Profile.jsx" className="py-10 flex justify-center"><Spin /></div>
    );
  }

  return (
    <div data-easytag="id5-react/src/pages/Profile.jsx" className="max-w-2xl mx-auto space-y-4">
      <Card data-easytag="id6-react/src/pages/Profile.jsx" title="Ваш профиль">
        <Descriptions data-easytag="id7-react/src/pages/Profile.jsx" column={1} bordered size="small">
          <Descriptions.Item data-easytag="id8-react/src/pages/Profile.jsx" label="Имя">{user?.name || '—'}</Descriptions.Item>
          <Descriptions.Item data-easytag="id9-react/src/pages/Profile.jsx" label="Телефон">{user?.phone || '—'}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card data-easytag="id10-react/src/pages/Profile.jsx" title="Бонусы">
        <Descriptions data-easytag="id11-react/src/pages/Profile.jsx" column={1} bordered size="small">
          <Descriptions.Item data-easytag="id12-react/src/pages/Profile.jsx" label="Баланс">{Number(data?.balance || 0).toFixed(2)} ₽</Descriptions.Item>
          <Descriptions.Item data-easytag="id13-react/src/pages/Profile.jsx" label="Потрачено всего">{Number(data?.totalSpend || 0).toFixed(2)} ₽</Descriptions.Item>
          <Descriptions.Item data-easytag="id14-react/src/pages/Profile.jsx" label="Кэшбэк">{Number(data?.tierPercent || 0)}%</Descriptions.Item>
        </Descriptions>
      </Card>

      <div data-easytag="id15-react/src/pages/Profile.jsx" className="flex items-center gap-2">
        <Button data-easytag="id16-react/src/pages/Profile.jsx" onClick={handleEnablePush}>Включить уведомления</Button>
        <Button data-easytag="id17-react/src/pages/Profile.jsx" danger onClick={logout}>Выход</Button>
      </div>
    </div>
  );
}
