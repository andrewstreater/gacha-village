import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ItemsAll from '../components/ItemsAll/ItemsAll';
import ItemDetails from '../components/ItemDetails/ItemDetails';
import ItemsByUserId from '../components/ItemsByUserId';
import ItemsByCurrentUser from '../components/ItemsByCurrentUser';
import CreateItemForm from '../components/CreateItemForm';
import ManageItemImages from '../components/ManageItemImages';
import TradesCurrentUser from '../components/TradesCurrentUser';
import TradeDetails from '../components/TradeDetails/TradeDetails';
import ListsCurrentUser from '../components/ListsCurrentUser';
import ListDetails from '../components/ListDetails/ListDetails';
import ListsByUserId from '../components/ListsByUserId';
import CreateListForm from '../components/CreateListForm/CreateListForm';
import UpdateItemForm from '../components/UpdateItemForm';
import UpdateListForm from '../components/UpdateListForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ItemsAll />,
      },
      {
        path: "items",
        element: <ItemsAll />,
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
        path: "items/new",
        element: <CreateItemForm />,
      },
      {
        path: "items/:itemId/images",
        element: <ManageItemImages />,
      },
      {
        path: "items/:itemId/update",
        element: <UpdateItemForm />
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
      },
      {
        path: "lists/user/:userId",
        element: <ListsByUserId />,
      },
      {
        path: "lists/new",
        element: <CreateListForm />
      },
      {
        path:"lists/:listId/update",
        element: <UpdateListForm />
      }
    ],
  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    path: "signup",
    element: <SignupFormPage />,
  }
]);
