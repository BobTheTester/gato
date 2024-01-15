import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import StyledRules from './screens/Rules'
import Bon from './screens/Bon'
import 'semantic-ui-css/semantic.min.css'
import UsedBon from './screens/UsedBon'
import SuperSecret from './screens/SuperSecret'
import { DBContextProvider } from './contexts/dbContext'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container!)

const router = createBrowserRouter([
  {
    path: '/',
    element: <StyledRules />
  },
  { path: '/bon/:id', element: <Bon /> },
  {
    path: '/used',
    element: <UsedBon />
  },
  {
    path: 'supersecret',
    element: <SuperSecret />
  }
])

root.render(
  <StrictMode>
    <DBContextProvider>
      <RouterProvider router={router} />
    </DBContextProvider>{' '}
  </StrictMode>
)
