import { BrowserRouter, Routes, Route, } from "react-router-dom"
import Layout from "./components/HomePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//TODO: Add routes to get additional data such as wind, rain, UV, snow, etc.
import HomePage from "./components/HomePage"
import './index.css'
import React from "react"
import NotFoundPage from "./pages/NotFoundPage"
import WeatherData from "./components/WeatherData"
import { elements } from "chart.js"

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/:zipCode',
        element: <WeatherData />,
        children: [
          {
            path: '/:zipCode/temperature',
            element: <WeatherData />
          },
          {
            path: '/:zipCode/rain',
            element: <WeatherData />
          },
          {
            path: '/:zipCode/wind',
            element: <WeatherData />
          },
          {
            path: '/:zipCode/snow',
            element: <WeatherData />
          }
        ]
      }
    ]
  },

])
function App() {


  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
