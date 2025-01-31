import { useRoutes } from 'react-router-dom';
import { AppRoutes } from './constants.ts';
import { Layout } from '../layouts/Layout.tsx';
import { lazy, Suspense } from 'react';
import { PrivateRote } from './PrivateRote.tsx';

const Home = lazy(() => import('../pages/HomePage.tsx'));
const Login = lazy(() => import('../pages/LoginPage.tsx'));
const Users = lazy(() => import('../pages/UsersPage.tsx'));
const Recipes = lazy(() => import('../pages/RecipesPage.tsx'));
const User = lazy(() => import('../pages/UserDetailsPage.tsx'));
const Recipe = lazy(() => import('../pages/RecipeDetailsPage.tsx'));
console.log('Routes loaded');
export const Routes = () =>
  useRoutes([
    {
      path: AppRoutes.root,
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<p>Loading</p>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: AppRoutes.login,
          element: (
            <Suspense fallback={<p>Loading</p>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: AppRoutes.users,
          element: (
            <PrivateRote>
              <Suspense fallback={<p>Loading</p>}>
                <Users />
              </Suspense>
            </PrivateRote>
          ),
        },
        {
          path: AppRoutes.recipes,
          element: (
            <PrivateRote>
              <Suspense fallback={<p>Loading</p>}>
                <Recipes />
              </Suspense>
            </PrivateRote>
          ),
        },
        {
          path: AppRoutes.user,
          element: (
            <PrivateRote>
              <Suspense fallback={<p>Loading</p>}>
                <User />
              </Suspense>
            </PrivateRote>
          ),
        },
        {
          path: AppRoutes.recipe,
          element: (
            <PrivateRote>
              <Suspense fallback={<p>Loading</p>}>
                <Recipe />
              </Suspense>
            </PrivateRote>
          ),
        },
      ],
    },
  ]);
