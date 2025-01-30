import { useRoutes } from 'react-router-dom';
import { AppRoutes } from './constants.ts';
import { Layout } from '../layouts/Layout.tsx';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/HomePage.tsx'));
const Login = lazy(() => import('../pages/LoginPage.tsx'));
const Users = lazy(() => import('../pages/UsersPage.tsx'));
export const Routes = () =>
  useRoutes([
    {
      path: AppRoutes.root,
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: 'login',
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: 'users',
          element: (
            <Suspense>
              <Users />
            </Suspense>
          ),
        },
      ],
    },
  ]);
