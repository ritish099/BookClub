import {createContext, useState} from "react";

const UserContext = createContext({});

const Context = ({children}) => {
  const [user, setUser] = useState({user: null, token: null});

  <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>;
};

export default Context;
