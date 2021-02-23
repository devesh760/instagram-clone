import logo from './logo.svg';
import './App.css';
import Home from './components/Home/home';
import Login from './components/auth/Login/Login'
import Signup from './components/auth/signup/signup'
import fire from './firebase/fire'
import { Component } from 'react';
import {Route,Switch} from 'react-router-dom';

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
      toRender = <Route exact path='/' component ={Home}/>
    }
    else{
      toRender = (
        <>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
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
export default App;
