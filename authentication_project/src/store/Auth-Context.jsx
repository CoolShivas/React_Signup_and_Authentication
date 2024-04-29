import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  logIn: (arr) => {},
  logOut: () => {},
});

export const ContextProvider = (props) => {
  const [tokenLatest, setTokenLatest] = useState(null);

  const userIsLoggedIn = !!tokenLatest;

  const handlerOnLogin = (arr) => {
    setTokenLatest(arr);
  };

  const handlerOnLogOut = () => {
    setTokenLatest(null);
  };

  const contextValue = {
    token: tokenLatest,
    isLoggedIn: userIsLoggedIn,
    logIn: handlerOnLogin,
    logOut: handlerOnLogOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
