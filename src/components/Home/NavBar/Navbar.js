import React, { Component } from 'react';
import Logo from "../../../assets/insta-logo.png";
import classes from './Navbar.module.css';
import Searchbar from './Search/search';
import YourAccount from './YourAccount/YourAccount'
import Backdrop from '../../UI/Backdrop/Backdrop';
import MyLogo from '../../../assets/ew.jpg';
import {Link} from 'react-router-dom'
import Avatar from '../../UI/avatar/avatar' 
import {fireDb} from '../../../firebase/firebase'
class Navbar extends Component {
    state = { 
          showBackdrop:false,
          showYourAccount:false,
          photoURL:''
      }
    componentDidMount(){
      let uid = JSON.parse(localStorage.getItem('userData')).uid;
      this.setUserProfile(uid)
    }
    setUserProfile = (uid)=> {
      fireDb.getDataById(uid).then(data=>{
        if(data && data.photoURL)
          this.setState({photoURL:data.photoURL})
      })
    }
    backdrop_clicked_handler = ()=>{
      this.setState({showBackdrop:false,showYourAccount:false});
    }
    yourAccount_handler=()=>{
      this.setState({showBackdrop: true,showYourAccount:true});
    }
    render() { 
        return (
          <>
            <nav className={classes.Homenav}>
              <div className={classes.container}>
                <div className={classes.Logo}>
                  <Link to='/'>
                    <img draggable={false} src={Logo} alt="" />
                  </Link>
                </div>
                <Searchbar />
                <div className={classes.NavItem}>
                  <Link to='/'>
                    <svg
                      aria-label="Home"
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                    </svg>
                  </Link>
                  <a href="">
                    <svg
                      aria-label="Direct"
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                    </svg>
                  </a>
                  <a href="">
                    <svg
                      aria-label="Find People"
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path
                        clipRule="evenodd"
                        d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="">
                    <svg
                      aria-label="Activity Feed"
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  </a>
                  <div
                    onClick={this.yourAccount_handler}
                    className={classes.YourAccount}
                  >
                    {this.state.photoURL!==''?<img src={this.state.photoURL} alt="" />:<Avatar style={{border:'1px solid rgba(0,0,0,0.3)'}}/>}
                    {this.state.showYourAccount ? (
                      <YourAccount signOut={this.props.signOut} />
                    ) : null}
                  </div>
                </div>
              </div>
              {this.state.showBackdrop ? (
                <Backdrop
                  on_click={this.backdrop_clicked_handler}
                />
              ) : null}
            </nav>
          </>
        );
    }
}
 
export default Navbar;