import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//paginas
import Home from './routes/Home';
import './index.css'
import Formulario from './routes/Formulario';
import FormularioUpdate from './routes/FormularioUpdate';

const router= createBrowserRouter([
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
      path: `/funcionario/:id`,
      element: <FormularioUpdate/>
    },
  ],
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
