import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div data-easytag="id1-react/src/pages/NotFound.jsx" className="py-10">
      <Result
        data-easytag="id2-react/src/pages/NotFound.jsx"
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={<Button data-easytag="id3-react/src/pages/NotFound.jsx" type="primary" onClick={() => navigate('/')}>На главную</Button>}
      />
    </div>
  );
}
