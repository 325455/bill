import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/assets/css/reset.css';
import 'zarm/dist/zarm.css';
import '@/assets/css/common.css';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
