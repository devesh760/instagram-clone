import React, { Component } from "react";
import Logo from "../../UI/Logo";
import classes from "./signup.module.css";
import LoginWithFb from "../Login/LoginWithFb/LoginWithFb";
import { Link } from "react-router-dom";
import fire, { firebase } from "../../../firebase/fire";
import emailExistence from "email-existence";
class SignUp extends Component {
  state = {
    Email: "",
    Fullname: "",
    Username: "",
    Password: "",
  };
  change_handler = (e) => {
    this.setState({ [e.target.placeholder]: e.target.value });
  };
  signUp_handler = (e) => {
    e.preventDefault();
    console.log(this.state);
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then((userData) => {
        console.log(userData.user.providerData);
        this.setUserDataOnDb(
          this.state.Email,
          this.state.Fullname,
          this.state.Username
        );
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  setUserDataOnDb(Uemail, Ufullname, UUsername) {
    let data = {
      email: Uemail,
      fullname: Ufullname,
      username: UUsername,
      uid: 0,
      photoURL: null,
      fromFacebook: false,
      likeCount: 0,
    };
    // get last user uid to sync
    fire
      .database()
      .ref("/users")
      .limitToLast(1)
      .get()
      .then((last_user_data) => {
        console.log(last_user_data.val());
        if (last_user_data.val() == null) {
          data.uid = 0;
        } else {
          if (Array.isArray(last_user_data.val())) {
            data.uid =
              last_user_data.val()[last_user_data.val().length - 1].uid + 1;
          } else {
            let keysArr = Object.keys(last_user_data.val());
            let lastkey = keysArr[keysArr.length - 1];
            data.uid = last_user_data.val()[lastkey].uid + 1;
          }
        }

        let db = fire.database();
        db.ref("/users/" + data.uid).set(data);
        this.setDataToLocalStorage(data);
      })
      .catch((err) => {
        console.log("Data not Written" + err);
      });
  }
  setDataToLocalStorage(data) {
    localStorage.setItem("userData", JSON.stringify(data));
  }
  render() {
    return (
      <div className={classes.signUpContainer}>
        <div className={classes.signUp}>
          <div className={classes.logo}>
            <Logo height="90px" width="175px" />
          </div>
          <p>Sign up to see photos and videos from your friends.</p>
          <div className={classes.fbBtn}>
            <LoginWithFb color="#FFFFFF" />
          </div>
          <div className={classes.or}>
            <div className={classes.bar}></div>
            <div>OR</div>
            <div className={classes.bar}></div>
          </div>
          <form>
            <input
              onChange={this.change_handler}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={this.change_handler}
              type="text"
              placeholder="Fullname"
            />
            <input
              onChange={this.change_handler}
              type="text"
              placeholder="Username"
            />
            <input
              onChange={this.change_handler}
              type="password"
              placeholder="Password"
            />
              <button onClick={this.signUp_handler}>Sign up</button>
          </form>
          <p>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
        <p className={classes.login}>
          Have an account?{" "}
          <Link to="/" style={{ color: "#0095F6" }}>
            <span>Log in</span>
          </Link>
        </p>
        <div className={classes.footer}>&#169; instagram by Devesh</div>
      </div>
    );
  }
}

export default SignUp;
