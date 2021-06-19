import React, { useEffect, useState } from "react";
import { fireDb } from "../../firebase/firebase";
import fire from "../../firebase/fire";
import Navbar from "../Home/NavBar/Navbar";
import classes from "./Profile.module.css";
import Avatar from "../UI/avatar/avatar";
import {Link } from 'react-router-dom'

function Profile() {
  let [userData, setUserData] = useState(null);
  let [followers, setFollowers] = useState(Math.ceil(Math.random() * 50 + 1));
  let [followings, setFollowings] = useState(Math.ceil(Math.random() * 50 + 1));
  let signout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed out");
      });
  };
  useEffect(()=>{
    fetchData();
  },[])
  function fetchData(){
      let uid = JSON.parse(localStorage.getItem('userData')).uid;
      console.log(uid)
       fireDb.getDataById(uid).then(data=>{
           setUserData(data);
       })
  }
  let TOSHOW = null;
  if (userData) {
    let posts = null;
    if(userData.posts)
      posts = Object.values(userData.posts).map((post) => {
        return <img key={JSON.stringify(post)} src={post.fileurl} />;
      });
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
                <Link to='/Edit-profile'>
                  <button>Edit profile</button>
                </Link>
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
              <p className={classes.Bio}>
                {userData.bio
                  ? userData.bio
                  : `𝕾𝖙𝖚𝖉𝖊𝖓𝖙 📓 🖋️ | 𝕷𝖊𝖆𝖗𝖓𝖊𝖗 🔰 | 𝕻𝖍𝖎𝖑𝖔𝖘𝖔𝖕𝖍𝖊𝖗 ☀️ 🌚
                  𝕭𝖎𝖗𝖙𝖍𝖉𝖆𝖞 : 𝕾𝖊𝖕𝖙𝖊𝖒𝖇𝖊𝖗 07🎂🎂
                  𝕽𝖊𝖑𝖎𝖌𝖎𝖔𝖓 : 𝕳𝖚𝖒𝖆𝖓𝖎𝖙𝖞 🙏 🙏
                  𝖅𝖔𝖉𝖎𝖆𝖈 𝖘𝖎𝖌𝖓 : 𝕾𝖆𝖌𝖌𝖎𝖙𝖆𝖗𝖎𝖚𝖘 ♐
                  🅻🅰🅷🅰🆁 | 🅶🆆🅰🅻🅸🅾🆁 | 🅺🅾🆃🅰`}
              </p>
            </aside>
          </header>
          <h1>Posts</h1>
          <hr style={{ margin: "10px 0 30px 0" }} />
          <section>{posts}</section>
        </main>
      </div>
    );
  }
  return <>{TOSHOW}</>;
}

export default Profile;
