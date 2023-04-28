import {createBrowserRouter} from "react-router-dom";
import Home from "../components/Home";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Error from "../components/Error";
import SidebarWithHeader from "../components/Sidebar";
import Favorites from "../components/Favorites";
import EmailVerified from '../components/EmailVerified';
import Profile from "../components/Profile";
import BookUpload from "../components/BookUpload";
import Messenger from "../pages/Messenger/Messenger";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <Error />,
  },
  {
    path: "/verify/:message",
    element: <EmailVerified />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <SidebarWithHeader children={<Profile />} />,
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
    element: <SidebarWithHeader children={<BookUpload />} />,
    errorElement: <Error />
  },
  {
    path: "/messenger",
    element: <SidebarWithHeader children={<Messenger />} />,
    errorElement: <Error />,
  }
]);

export default router;
