import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/home';
import Login from './components/auth/Login/Login'
import Signup from './components/auth/signup/signup'
import User from './components/users/user'
import fire from './firebase/fire'
import Profile from './components/userProfile/Profile'
import EditProfile from './components/userProfile/EditProfile/EditProfile'
import {withRouter,Route,Router,Switch,useHistory} from 'react-router-dom';


class App extends Component {
  state={
    userExist:false
  }
  componentDidMount(){
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userExist: true });
      } else {
        this.setState({ userExist: false });
      }
    });
  }
  render(){
    let toRender;
    if(this.state.userExist){
      toRender = (
      <>
      <Route exact path='/' component ={Home}/>
      <Route  path='/users/:id' component ={User}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/Edit-profile' component={EditProfile}/>
      </>);
    }
    else{
      toRender = (
        <>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </>
      );
    }
    return (<div className="App">
     <Switch>
      {toRender}
     </Switch>
    </div>);
  }
  
}
export default withRouter(App);