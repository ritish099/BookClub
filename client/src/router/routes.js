import {createBrowserRouter} from "react-router-dom";
import Home from "../components/Home";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Error from "../components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error/>,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <Error/>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error/>,
  },
]);

export default router;
