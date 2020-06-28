import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Landing from './components/LandingPage/landing'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <BrowserRouter>
            {/* <ProgressBar /> */}
            {/* <Navbar /> */}
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
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
