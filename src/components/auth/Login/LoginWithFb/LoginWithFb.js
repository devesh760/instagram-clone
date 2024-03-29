import React from "react";
import fire, { firebase } from "../../../../firebase/fire";
import classes from "./LoginWithFb.module.css";
import {useHistory} from 'react-router-dom'
const LoginWithFb = (props)=> {
  let history = useHistory();
  let facebook_login_handler = () => {
    let fbProvider = new firebase.auth.FacebookAuthProvider();
    fire
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        let {...data} = result.user.providerData[0];
        data['photoURL'] = result.additionalUserInfo.profile.picture.data.url;
        if(result.additionalUserInfo.isNewUser)
          setUserDataOnDb(data);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let setUserDataOnDb = (userdata)=>{
    let {...data} = userdata;
    data["fullname"] = data.displayName;
    delete data.displayName;
    delete data.providerId;
    data["fromFacebook"] = true;
    // get last user uid to sync
    let recPostRef = fire.database().ref('/users').limitToLast(1)
    recPostRef.get().then(last_user_data=>{
      if(last_user_data.val()===null){
        data.uid = 0;
      }
      else{
        if(Array.isArray(last_user_data.val())){
          data.uid = last_user_data.val()[last_user_data.val().length-1].uid + 1;
        }
        else{
            let keysArr = Object.keys(last_user_data.val());
            let lastkey = keysArr[keysArr.length-1];
            data.uid = last_user_data.val()[lastkey].uid + 1;
        }
      }
      data["username"] = data.fullname + "_" + data.uid;
      let db = fire.database();
      db.ref("/users/" + data.uid).set(data);
      setDataToLocalStorage(data);
      // data.uid = ;
    }).catch(err=>{
      console.log('Data not Written' + err);
    })
  }
  function setDataToLocalStorage(data){
    localStorage.setItem('userData',JSON.stringify(data));
  }
  return (
    <div
      style={{ color: props.color }}
      onClick={facebook_login_handler}
      className={classes.logWithFb}
    >
      <i className="fab fa-facebook-square"></i>
      <p>{props.signup ? "sign up" : "Log in"} with Facebook</p>
    </div>
  );
}

export default LoginWithFb;
//https://instagram-clone-51f0b.firebaseapp.com/__/auth/handler