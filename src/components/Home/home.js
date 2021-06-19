import React, { Component } from 'react';
import fire from '../../firebase/fire';
import Navbar from "./NavBar/Navbar";
import classes from './Home.module.css';
import CreatePost from "./createPost/createPost";
import Posts from './Posts/Posts'
class Home extends Component{
    signout=()=>{
        fire.auth().signOut().then(()=>{
            console.log('Signed out')
        })
    }
    render(){
        return (
          <div className={classes.Home}>
            <Navbar signOut={this.signout} />
            <div className={classes.Container}>
              <aside>
                <CreatePost />
                <Posts />
              </aside>
              <aside>
                
              </aside>
            </div>
          </div>
        );
    }
} 

export default Home;