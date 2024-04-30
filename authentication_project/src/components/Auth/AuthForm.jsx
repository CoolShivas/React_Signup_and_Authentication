import { useHistory } from "react-router-dom";
import { useState , useRef, useContext} from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/Auth-Context";

const AuthForm = () => {

  const prevHistory = useHistory();

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  
  const {logIn} =  useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handlerOnSubmitForm = (event) =>{
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url ;
    if(isLogin)
    {
      // // Here, we have used the firebase rest api of SignIn with Password and key is generated by making the firebase project and added to this link for SignIn purpose ;
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`
    }
    else
    {
      // // Here, we have used the firebase rest api of SignUp with Password and key is generated by making the firebase project and added to this link for SignUp purpose ;
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`
    }
    fetch(url, {
      method : 'POST',
      body : JSON.stringify({
        email : enteredEmail, // Sending our entered email to server for LogIn and LogOut purpose ;
      password : enteredPassword, // Sending our entered password to server for LogIn and LogOut purpose ;
      returnSecureToken : true, // With the help of Boolean value making the token secure ;
      }),
      headers : {
        'Content-Type' : 'application/json',
      },
    }).then((response)=>{
      setIsLoading(false); // After getting the successfull response making the loading state to false ;
      if(response.ok)
      {
        return response.json(); // Getting the successfull data converted into again json format ;
      }
      else 
      {
        return response.json().then((data)=>{
          // // Getting the error then showing the error message by alert as well on console ;
          let errMsg = "Authentication Failed";
          // if(data && data.error && data.error.message)
          // {
          //   errMsg = data.error.message;
          // }
          // alert(errMsg);
          throw new Error(errMsg);
        })
      }
    }).then((res)=>{
      // // So, we already know that the request or response is send successfully to the server ;
      console.log(res);
      logIn(res.idToken); // Connecting with handlerOnLogIn to setToken with server's idToken ;
      prevHistory.replace('/'); // Here, we are redirecting him to the HomePage but not able to go back because we have used the replace keyword with useHistory whereas push allow us to go back to previous page ;
    }).catch((err)=>{
      // // If any error occurs during the response send it to server then we catch it ;
      console.log(err.message);
      alert(err.message);
    })

    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
    
  };

  return (
    <section className={classes.auth}>
      {/* <h1> Login / SignUp </h1> */}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={handlerOnSubmitForm }>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
           {!isLoading && <button> {isLogin ? 'Login' : 'Create Account'} </button>}
           {isLoading && <p> Sending Request.... </p>}
          
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
