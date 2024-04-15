import { Navigate, useRoutes } from 'react-router-dom'
import { Layout } from '@/layouts/Default'
import { Chat } from '@/pages/Chat'
import { Home } from '@/pages/Home'

export const RouteConf = () => {
  const routeConfig = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'c/:id',
          element: <Chat />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])
  return routeConfig
}
