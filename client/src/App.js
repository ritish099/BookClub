import { ChakraProvider, IconButton, Icon } from "@chakra-ui/react";
import { BsFillChatFill } from "react-icons/bs";
import router from "./router/routes";
import { RouterProvider } from "react-router-dom";
import userContext from "./context/userContext";
import { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";

function App() {
  const [user, setUser] = useState({ token: null });

  useEffect(() => {
    document.body.style.position = "relative";
  }, []);

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <ChakraProvider>

          <IconButton
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
          colorScheme="teal"
          size="lg"
            icon={<Icon as={BsFillChatFill} />}
          />

          <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
