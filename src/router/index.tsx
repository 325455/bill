import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Sign = React.lazy(() => import('@/views/sign'));
const Home = React.lazy(() => import('@/views/home'));
const Statis = React.lazy(() => import('@/views/statis'));
const User = React.lazy(() => import('@/views/user'));
const Detail = React.lazy(() => import('@/views/detail'));
const ChangeUserInfo = React.lazy(() => import('@/views/changeUserInfo'));
const ResetPassword = React.lazy(() => import('@/views/resetPassword'));
const About = React.lazy(() => import('@/views/about'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/sign" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/sign',
    element: <Sign />,
  },
  {
    path: '/statis',
    element: <Statis />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/detail/:billId',
    element: <Detail />,
  },
  {
    path: '/change-user-info',
    element: <ChangeUserInfo />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/about',
    element: <About />,
  },
];
