import React,{Component} from "react";
import Logo from "../../UI/Logo";
import fire,{firebase} from '../../../firebase/fire';
import "./Login.css";
import {Link} from 'react-router-dom'


class Login extends Component{
  state={
    email:'',
    password:'',
    emailErrMessage:'',
    passwordErrMessage:'',
    loginErrMessage:''
  }
   input_change_handler=(e)=>{
      e.preventDefault();
      this.setState({[e.target.type]: e.target.value})
   }
   login_btn_handler=(e)=>{
    this.setState({ passwordErrMessage:'',emailErrMessage: '',loginErrMessage:''});
    e.preventDefault();
    console.log(e);
    let email = this.state.email;
    let password = this.state.password;
    email = email.trim();
    password = password.trim();
    let flag = false;
    if(email.length <1 || !email.includes('@') || !email.includes('.com')){
      this.setState({emailErrMessage:'Email is not valid'});
      flag=true;
    }
    if(password.length<4){
      this.setState({ passwordErrMessage: "Password must be of 4 character" });
      flag=true;
    }
    if(!flag){
      this.login(email,password);
    }
  }
   login =(email,password)=>{
    fire.auth().signInWithEmailAndPassword(email,password).then((userCredential)=>{
      console.log(userCredential.user);
    }).catch(err=>{
      this.setState({loginErrMessage:err.code})
      console.log(err,'color:green');
    })
    console.log(email,password);
  }
  facebook_login_handler=()=>{
    let fbProvider = new firebase.auth.FacebookAuthProvider();
    fire.auth().signInWithPopup(fbProvider).then(result=>{
      console.log(result)
    }).catch(err=>{
      console.log(err);
    })
  }
  render(){

    return (
      <div className="login-container">
        <div className="login">
          <div className="logo">
            <Logo height="90px" width="175px" />
          </div>
          <form action="">
            <input
              onChange={this.input_change_handler}
              type="email"
              placeholder="Email"
            />
            {this.state.emailErrMessage ? (
              <span>{this.state.emailErrMessage}</span>
            ) : null}
            <input
              onChange={this.input_change_handler}
              type="Password"
              placeholder="Password"
            />
            {this.state.passwordErrMessage ? (
              <span>{this.state.passwordErrMessage}</span>
            ) : null}
            <button onClick={this.login_btn_handler}>Log In</button>
          </form>
          <div className="or">
            <div className="bar"></div>
            <div>OR</div>
            <div className="bar"></div>
          </div>
          <div onClick={this.facebook_login_handler} className="log-with-fb">
            <i className="fab fa-facebook-square"></i>
            <p>Log in with Facebook</p>
          </div>
          {this.state.loginErrMessage ? (
            <p className="for-wrong-email-pass">
              You have entered an invalid username or password
            </p>
          ) : null}
          <p className="forgot-password">forgot-password?</p>
        </div>
        <p className="signup-here">
          Don't have an account? <Link to='/signup'><span>Sign up</span></Link>
        </p>
        <div className="footer">&#169; Instagram from Devesh</div>
      </div>
    );
  }
}

export default Login;
