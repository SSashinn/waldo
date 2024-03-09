import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Game from './pages/Game';

export default function Router(){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/game",
      element: <Game />
    },
  ]);

  return <RouterProvider router={router} />
    
}
