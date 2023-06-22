import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import Home from './components/Home'
import Formulario from './components/Formulario'
import FormularioUpdate from './components/FormularioUpdate'
import DeletarFuncionario from './components/DeletarClient'

const router= createBrowserRouter([
  {
  element: <App />,
  children:[
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path: "/cadastro-client",
      element: <Formulario></Formulario>
    },
    {
      path: `/client/:id`,
      element: <FormularioUpdate/>
    },
    {
      path:`/client-delete/:id`,
      element: <DeletarFuncionario/>
    }
  ],
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <RouterProvider router={router} />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)