import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider, Route, Form } from "react-router-dom";

//paginas
import Home from './routes/Home';

import './index.css'
import Formulario from './routes/Formulario';
import Funcionario from './routes/Funcionario';
var id = 8;
const router = createBrowserRouter([
  {
  element: <App />,
  children:[
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path: "/cadastro-funcionario",
      element: <Formulario></Formulario>
    },
    {
      path: `/funcionario/${id}`,
      element: <Funcionario></Funcionario>
    },
  ],
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
