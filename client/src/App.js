import {ChakraProvider} from "@chakra-ui/react";

import router from "./router/routes";
import {RouterProvider} from "react-router-dom";
import BookUpload from "./components/BookUpload.js"

function App() {
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
