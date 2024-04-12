import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllItems from '../components/AllItems/AllItems';
import ItemDetails from '../components/ItemDetails/ItemDetails';
import ItemsByUserId from '../components/ItemsByUserId';
import ItemsByCurrentUser from '../components/ItemsByCurrentUser';
import TradesCurrentUser from '../components/TradesCurrentUser';
import TradeDetails from '../components/TradeDetails/TradeDetails';
import ListsCurrentUser from '../components/ListsCurrentUser';
import ListDetails from '../components/ListDetails/ListDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "items",
        element: <AllItems />,
      },
      {
        path: "items/:itemId",
        element: <ItemDetails />,
      },
      {
        path: "items/user/:userId",
        element: <ItemsByUserId />,
      },
      {
        path: "items/current",
        element: <ItemsByCurrentUser />,
      },
      {
        path: "trades/current",
        element: <TradesCurrentUser />,
      },
      {
        path: "trades/:tradeId",
        element: <TradeDetails />,
      },
      {
        path: "lists/current",
        element: <ListsCurrentUser />,
      },
      {
        path: "lists/:listId",
        element: <ListDetails />,
      }
    ],
  },
]);
