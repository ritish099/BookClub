import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer';
import Products from './components/Products';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar></Navbar>
      <ChakraProvider>
        <Products />
        <Footer />
      </ChakraProvider>
    </>

  );
}

export default App;
