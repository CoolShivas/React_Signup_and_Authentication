import { useState , useRef} from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    if(isLogin)
    {

    }
    else{
      fetch(`https://crudcrud.com/api/dfb5b7e301e2492eb241643d7093be68/bhaiyaJi`,{
        method : 'POST',
        body : JSON.stringify({
          email : enteredEmail,
          password : enteredPassword,
          returnSecureToken : true,
        }),
        headers:{
          'Content-Type' : 'application/json'
        },
      }).then((res)=>{
        setIsLoading(false);
        console.log(res);
        // if(res.ok)
        // {

        // }
        // else{
        //   return res.json().then((data)=>{
        //     let errMsg = 'Authentication Failed';
        //     // if(data && data.error && data.error.message)
        //     // {
        //     //   errMsg = data.error.message;
        //     // }
        //     alert(errMsg);
        //   });
        // }
      }).catch((err)=>{
        console.log(err);
      })
    }
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
          {isLoading && <p> Sending Request... </p>}
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
