import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {CreateBrowserRoute, RouterProvider, Route, createBrowserRouter} from "react-router-dom";
import './index.css'
const router = createBrowserRouter([{
  element: <App/>,
  children:[
    {
      path: "/",
    },
    {
      path: "/new",
    }
  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
