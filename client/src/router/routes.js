import {createBrowserRouter} from "react-router-dom";
import Home from "../components/Home";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Error from "../components/Error";
import SidebarWithHeader from "../components/Sidebar";
import Favorites from "../components/Favorites";
import BookUpload from "../components/BookUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "fav",
    element: <SidebarWithHeader children={<Favorites />} />,
    errorElement: <Error />,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    path: "/upload",
    element: <BookUpload />,
    errorElement: <Error />,
  },
]);

export default router;
