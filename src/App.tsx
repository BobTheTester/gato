import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import StyledRules from './screens/Rules'
import Bon from './screens/Bon'
import 'semantic-ui-css/semantic.min.css'
import UsedBon from './screens/UsedBon'
import SuperSecret from './screens/SuperSecret'

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

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
