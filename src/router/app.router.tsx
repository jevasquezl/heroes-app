import { createHashRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { lazy } from 'react';


// LAZYLOAD
// import { SearchPage } from '@/heroes/pages/search/SearchPage';

// De esta forma es muy complejo
// const SearchPage = lazy(()=> import('@/heroes/pages/search/SearchPage').then(module => ({default: module.SearchPage})))

// se espera la importacion por defecto del componente SearchPage.tsx
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'))
const HeroPage = lazy(() => import('@/heroes/pages/hero/HeroPage'))
// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'heroes/:idSlug',
        element: <HeroPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
