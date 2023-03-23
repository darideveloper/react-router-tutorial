import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root'
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact'
import ErrorPage from './routes/error-page'
import EditContact, {
  action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from './routes/index'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, // function to run when component is loaded
    action: rootAction, // function to run when submitting form
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index/>
          },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />, 
            action: editAction,
            loader: contactLoader, // user loader from other component
          }, 
          {
            path: "/contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>, // override errorElement
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);