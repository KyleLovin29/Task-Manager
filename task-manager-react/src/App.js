import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Tasks from "./components/task";
import Login from "./components/login";
import Logout from "./components/logout";
import RegisterUser from "./components/registerUser";
import TaskForm from "./components/taskForm";
import Admin from "./components/admin/admin";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const user = auth.getCurrentUser();

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute exact path="/task/:id" component={TaskForm} />
            <Route
              path="/tasks"
              render={(props) => <Tasks {...props} user={user} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register-user" component={RegisterUser} />
            <Route path="/admin" component={Admin} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/tasks" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
