import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home'
import ReadMePage from '../pages/readme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/readme',
    element: <ReadMePage />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
