import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard.jsx";
import Navbar from "./Navbar.jsx";
import logo from "../assets/images/newputlogo.png";
import {
  login,
  setLoginError,
  setLoginSuccess,
  setLoginPending,
} from "../redux/reducer";
import { sendLoginRequest } from "../Request/requestCall";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;

    sendLoginRequest(email, password)
      .then((success) => {
        const expirationDuration = 1000 * 60 * 60 * 1;
        const currentTime = new Date().getTime();
        const prevAcceptedExpired = currentTime > expirationDuration;
        if (prevAcceptedExpired) {
          localStorage.setItem("isLoginSuccess", true);
        }

        this.props.setLoginPending(false);
        this.props.setLoginSuccess(true);

        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log("jain");
      });
  };

  render() {
    let { email, password } = this.state;
    let { isLoginPending, isLoginSuccess, LoginError } = this.props;
    let { setLoginPending, setLoginSuccess } = this.state;
    return (
      <React.Fragment>
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <img src={logo} alt="Avatar" className="avatar" />
                  <form class="form-signin" onSubmit={this.onSubmit}>
                    <div class="form-label-group">
                      <input
                        type="email"
                        name="email"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                      <label for="inputEmail">Email address</label>
                    </div>

                    <div class="form-label-group">
                      <input
                        type="password"
                        name="password"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      ></input>
                      <label for="inputPassword">Password</label>
                    </div>

                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                    </div>
                    <button
                      className="login"
                      type="submit"
                      value="login"
                      name="login"
                    >
                      login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    LoginError: state.LoginError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginPending: (isLoginPending) =>
      dispatch(setLoginPending(isLoginPending)),
    setLoginSuccess: (isLoginSuccess) =>
      dispatch(setLoginSuccess(isLoginSuccess)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
