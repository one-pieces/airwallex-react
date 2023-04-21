import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home'
import ReadMePage from '../pages/readme'
import ExcelPage from '../pages/excel'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/readme',
    element: <ReadMePage />,
  },
  {
    path: '/excel',
    element: <ExcelPage />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
