import { useHistory } from "react-router-dom";
import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/Auth-Context';

const ProfileForm = () => {

  const oldHistory = useHistory();

  const {token} = useContext(AuthContext);

  const newPasswordInputRef = useRef();

  const handlerOnChangePass = (event) =>{
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;

    // //  Here, we have used the firebase rest api of ChangePassword with key is generated by making the firebase project and added to this link for ChangePassword purpose ;
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=
    AIzaSyAJTO88hPkC-qALqeukizWjBn79zzDHzYQ`,{
      method : 'POST',
      body : JSON.stringify({
        idToken : token,
        password : enteredPassword,
        returnSecureToken : false,
      }),
      headers : {
        'Content-Type' : 'application.json',
      }
    }).then((res)=>{
      // // We know that the response is send it successfully ;
      oldHistory.replace('/');
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
