import React, { memo, useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { ConfigProvider, Loading } from 'zarm';
import { routes } from './router';
import NavBar from './components/nav-bar';

const TLoading = () => {
  return (
    <div className="center">
      <Loading size="lg" />
    </div>
  );
};

const App: React.FC = () => {
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    ['/home', '/statis', '/user'].includes(pathname) ? setShowNav(true) : setShowNav(false);
  }, [pathname]);

  return (
    <ConfigProvider primaryColor={'#007fff'}>
      <>
        <React.Suspense fallback={<TLoading />}>{useRoutes(routes)}</React.Suspense>
        {showNav && <NavBar />}
      </>
    </ConfigProvider>
  );
};

export default memo(App);
