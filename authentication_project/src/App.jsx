import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from "./store/Auth-Context";

function App() {

 const {isLoggedIn}  = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        {/* Here, if the user is not logged in then no need to show the auth page i.e, logIn or signUp page  */}
        {!isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}

        {/* Here, if we are logged in then only the profile url and userprofile page will appear */}
        {/* {isLoggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>} */}
        {/* Here, profile url acces is possible ; */}
        <Route path="/profile">
          {/* But, here if the user logged in then access the profile page or redirect to login or signup page */}
          {isLoggedIn && <UserProfile />}
          {!isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>

        {/* Here, if user without logged in will be redirect to home or enter any invalid url  */}
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;
