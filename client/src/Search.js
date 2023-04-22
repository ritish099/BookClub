import {Input} from "@chakra-ui/react";
import "./styles/search.css";
import { useState } from 'react';

const SearchBar = ({posts, setSearchResults}) => {
  const [search, setSearch] = useState('');

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} backgroundColor={'white'} placeholder="Search for books or authors..." my={10}/>;
};

export default SearchBar;
