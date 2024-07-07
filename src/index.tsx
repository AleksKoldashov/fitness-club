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
import Promotions from './page/PromotionsPage/Promotions';
import HomePromo from './page/PromotionsPage/HomePromo';
import { PromotionFriend } from './page/PromotionsPage/Promotion';
import OurTeam from './page/OurTeam';
import Posts from './components/OurTeam/Posts';
import Rates from './page/Rates';
import ProfilPage from './page/ProfilPage';
import Contacts from './page/Contacts';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

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
        path: '/profil',
        element: <ProfilPage/>,
      },
      {
        path: '/contacts',
        element: <Contacts/>,
      },
      {
        path: '/rates',
        element: <Rates/>,
      },
      {
        path: '/ourteam',
        element: <OurTeam/>,
      },
      {
        path: '/ourteam/post/:postId',
        element: <Posts/>,
      },
      {
        path: '/trener/:userId',
        element: <TrenerPage/>,
      },
      {
        path: '/athelete/:userId',
        element: <AthletePage/>
      },
      {
        path: '/homepromo',
        element: <HomePromo/>,
        children: [
          {
            path: '/homepromo/promotions',
            element: <Promotions/>,
          },
          {
            path: '/homepromo/promotionfriend',
            element: <PromotionFriend/>,
          },
        ]
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


