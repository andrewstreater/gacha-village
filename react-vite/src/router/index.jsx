import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllItems from '../components/AllItems/AllItems';
import ItemDetails from '../components/ItemDetails/ItemDetails';
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
