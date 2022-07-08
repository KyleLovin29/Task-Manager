import React from "react";
import Joi from "joi";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterUser extends Form {
  state = {
    data: { username: "", firstName: "", lastName: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    // email: Joi.string().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  });

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row"></div>
        <div className="row">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("firstName", "First Name")}
            {this.renderInput("lastName", "Last Name")}
            {/* {this.renderInput("email", "Email", "email")} */}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Submit")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterUser;
