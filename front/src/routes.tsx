import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import TablesTabs from "./pages/tables-tabs/tables-tabs.tsx";
import MapPage from "./pages/map-page/map-page.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TablesTabs />,
      },
      {
        path: '/maps',
        element: <MapPage />,
      },
      {
        path: '*',
        element: <TablesTabs />,
      }
    ]
  },
])
