import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './firebase';
import Home from './page/Home';
import ErrorPage from './page/error-page';
import AthletePage from './page/AthletePage';
import TrenerPage from './page/TrenerPage';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/home',
        element: <Home/>,
      },
      {
        path: '/trener/:userId',
        element: <TrenerPage/>,
      },
      {
        path: '/athelete/:userId',
        element: <AthletePage/>
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


