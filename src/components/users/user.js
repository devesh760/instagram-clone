import React, { useEffect, useState } from 'react';
import {fireDb} from '../../firebase/firebase'
import fire from "../../firebase/fire";
import Navbar from '../Home/NavBar/Navbar'
import classes from "./user.module.css";
import Avatar from '../UI/avatar/avatar'

function User({match}){
    let [userData , setUserData] = useState(null);
    let [follow,setfollow] = useState(false); 
    let [followers, setFollowers] = useState(Math.ceil(Math.random() * 50 + 1));
    let [followings, setFollowings] = useState(Math.ceil(Math.random() * 50 + 1));
    useEffect(()=>{
        fetchUserData();
    },[]);
    let fetchUserData = async () =>{
        const db = new fireDb(`/users/${match.params.id}`);
        const data = await db.getData();
        console.log(data);
        setUserData(data);
    }
    let signout = () => {
      fire
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed out");
        });
    };
    let followButtonHandler = () =>{
      if(follow){
        setFollowers(followers-1);
      }
      else{
        setFollowers(followers+1);
      }
      setfollow(!follow);
    }
    let TOSHOW = null;
    if(userData){
       let posts = null;
      if(userData.posts)
        posts = Object.values(userData.posts).map(post=>{
        return <img key={JSON.stringify(post)} src={post.fileurl}/>
      })
      TOSHOW = (
        <div className={classes.container}>
          <div className={classes.navBarContainer}>
            <Navbar signOut={signout} />
          </div>
          <main>
            <header>
              <div className={classes.imgContainer}>
                {userData.photoURL ? (
                  <img src={userData.photoURL} alt="" />
                ) : (
                  <Avatar />
                )}
              </div>
              <aside className={classes.userInfo}>
                <p className={classes.username}>
                  {userData.username}
                  <button onClick={followButtonHandler}>{follow?'following':'follow'}</button>
                </p>
                <div className={classes.postsFollowers}>
                  <span>
                    <span>{userData.posts?Object.values(userData.posts).length:0}</span> posts
                  </span>
                  <span>
                    <span>{followers}</span> followers
                  </span>
                  <span>
                    <span>{followings}</span> following
                  </span>
                </div>
                <p className={classes.fullname}>{userData.fullname}</p>
                <p className={classes.bio}>
                  {userData.bio}
                </p>
              </aside>
            </header>
            <h1>Posts</h1>
            <hr style={{ margin: "10px 0 30px 0" }} />
            <section>
              {posts}
            </section>
          </main>
        </div>
      );
    }
    return (
      <>
      {TOSHOW}
      </>
    );
}

export default User;