import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, useParams } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Landing from './components/LandingPage/landing'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import './styles/css/style.css';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

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
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup/:id?" component={SignUp} />
              {/* path="/signup/:id?" */}
              <PrivateRoute exact path="/profile" component={Profile} />
              {/* <PrivateRoute exact path="/blog" component={BlogPage} />
               <PrivateRoute
                  exact
                  path="/blog/post/create"
                  component={CreatePostPage}
               />
               <PrivateRoute
                  exact
                  path="/blog/post/update/:id"
                  component={UpdatePostPage}
               />
               <Route exact path="/blog/post/:id" component={ViewPostPage} />
               <Route path="/blog/:author" component={BlogPage} /> */}
               <Redirect from="*" to="/" />
            </Switch>
         </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
