import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Landing from './components/LandingPage/landing'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import ExercisesPage from './components/ExercisesPage/ExercisesPage';
import SubCategoriesPage from './components/SubCategoriesPage/SubCategoriesPage';
import Navbar from './components/Navbar/Navbar';
import './styles/css/style.css';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import ProgressBar from './components/ProgressBar/ProgressBar';
import Confirmation from './components/Confirmation/Confirmation';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
     store.dispatch(logoutUser());
     window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
      <BrowserRouter>
            {/* <ProgressBar /> */}
            <Navbar />
            <ProgressBar/>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup/:id?" component={SignUp} />
              <Route path="/confirmation/:token" component={Confirmation} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/exercises/:category/" component={ExercisesPage} />
              <PrivateRoute exact path="/exercises/:category/:subcategory" component={SubCategoriesPage} />
              <Route path="/" exact component={Landing} />
              <Redirect from="*" to="/" />
            </Switch>
         </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
