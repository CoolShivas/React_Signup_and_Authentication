// import { createContext, useState } from "react";

// const AuthContext = createContext({
//   token: "",
//   isLoggedIn: false,
//   logIn: () => {},
//   logOut: () => {},
// });

// export const ContextProvider = (props) => {

//   /// Here, localStorage.getItem("token") is not defineed and set the initialToken to undefined to get whatever present in the localStorage;
//   const initialToken = localStorage.getItem('data');

//   const [tokenLatest, setTokenLatest] = useState(initialToken);

//   const userIsLoggedIn = !!tokenLatest;

// useEffect(()=>{
//   localStorage.getItem('saveToken') && setTokenLatest(localStorage.getItem('saveToken'));
//   setUserIsLoggedIn(true);
// },[]);

//   const handlerOnLogin = (tokey) => {
//     setTokenLatest(tokey);
//     localStorage.setItem('saveToken', tokey);
//   };

//   const handlerOnLogOut = () => {
//     setTokenLatest(null);
//     localStorage.removeItem('saveToken');
//   };

//   const contextValue = {
//     token: tokenLatest,
//     isLoggedIn: userIsLoggedIn,
//     logIn: handlerOnLogin,
//     logOut: handlerOnLogOut,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


/////****************************************************************************************************************** */
// // The above way is also correct

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const ContextProvider = (props) => {
  /// Here, localStorage.getItem("token") is not defineed and set the initialToken to undefined to get whatever present in the localStorage;
  // const initialToken = localStorage.getItem('user' || null);

  const [tokenLatest, setTokenLatest] = useState(null);

  // Here, we are having the new way of doing this i.e, userIsLoggedIn = !!tokenLatest whereas !! is true or false compoler taking it automatically by inbuilt feature;
  // const userIsLoggedIn = !!tokenLatest;
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(tokenLatest);

 
  useEffect(() => {
    const storedUserLoggedInformation = localStorage.getItem("saveToken");
    if (storedUserLoggedInformation) {
      setUserIsLoggedIn(true);
    }
  }, []);

  useEffect(()=>{
    const timerId = setTimeout(()=>{
      handlerOnLogOut();
      alert('You have to login again');
    },5000);

    return (()=>{
      clearTimeout(timerId);
    });
  },[]);

  const handlerOnLogin = (tokey) => {
    setTokenLatest(tokey);
    localStorage.setItem("saveToken", tokey);
    setUserIsLoggedIn(true);
  };

  const handlerOnLogOut = () => {
    setTokenLatest(null);
    localStorage.removeItem("saveToken");
    setUserIsLoggedIn(false);
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

//////******************************************************************************************************* */
