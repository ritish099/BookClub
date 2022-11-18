import {Input} from "@chakra-ui/react";
import "./styles/search.css";

const SearchBar = ({posts, setSearchResults}) => {
  return <Input placeholder="Search for books or authors..." my={10}/>;
};
export default SearchBar;
