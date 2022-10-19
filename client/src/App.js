import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer';
import Products from './components/Products';



function App() {
  return (
    <ChakraProvider>
      <Products />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
