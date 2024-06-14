import{createBrowserRouter , RouterProvider } from "react-router-dom";

import './App.css'
import Home from "./pages/Home.jsx";
import RootLayout from "./pages/Root.jsx";
import Signup from "./pages/Signup.jsx";
import UserExercises from "./pages/UserExercises.jsx"
import Login from "./pages/Login.jsx";
import AddExercises from "./pages/Addexercises.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/exercises",
        element: <UserExercises />,
      },
      { path: "/addexercises", element: <AddExercises /> },
    ],
  },
]);



function App() {
  
 return <RouterProvider router={router} />;
    }

export default App
