import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/Auth-Context';

const ProfileForm = () => {

  const {token} = useContext(AuthContext);

  const newPasswordInputRef = useRef();

  const handlerOnChangePass = (event) =>{
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`,{
      method : 'POST',
      body : JSON.stringify({
        idToken : token,
        password : enteredPassword,
        returnSecureToken : false,
      }),
      headers : {
        'Content-Type' : 'application.json',
      }
    })

  };

  return (
    <form className={classes.form} onSubmit={handlerOnChangePass}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
