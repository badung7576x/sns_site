import { React, useEffect } from "react";
import Follows from "./pages/follows/Follows";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from './redux/store';
import { getUserData } from './redux/actions/userActions';
import { getUsers } from "./redux/actions/dataActions";

function App() {

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if(userId) {
      store.dispatch(getUserData(userId))
    }
    store.dispatch(getUsers())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/users">
              <Follows />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
