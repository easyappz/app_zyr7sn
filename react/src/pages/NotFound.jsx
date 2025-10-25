import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div data-easytag="id1-react/src/pages/NotFound.jsx" className="flex items-center justify-center py-20">
      <Result
        status="404"
        title={<span data-easytag="id2-react/src/pages/NotFound.jsx">404</span>}
        subTitle={<span data-easytag="id3-react/src/pages/NotFound.jsx">Страница не найдена</span>}
        extra={
          <Link data-easytag="id4-react/src/pages/NotFound.jsx" to="/">
            <Button data-easytag="id5-react/src/pages/NotFound.jsx" type="primary">На главную</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
