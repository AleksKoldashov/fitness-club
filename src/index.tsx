import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Client from './page/UserClient';
import Trener from './page/UserTrener';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/client',
        element: <Client/>,
      },
      {
        path: '/trener',
        element: <Trener/>,
      },
    ]
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<QueryClientProvider client={queryClient}>
<React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>

  </QueryClientProvider>
  
);


