import {ChakraProvider} from "@chakra-ui/react";

import router from "./router/routes";
import {RouterProvider} from "react-router-dom";
import userContext from "./context/userContext";
import {useState} from "react";

function App() {
  const [user, setUser] = useState({token: null});
  return (
    <>
      <userContext.Provider value={{user, setUser}}>
        <ChakraProvider>
          <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
