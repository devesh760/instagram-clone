import React from "react";
import fire, { firebase } from "../../../../firebase/fire";
import classes from "./LoginWithFb.module.css";
function LoginWithFb(props) {
  let facebook_login_handler = () => {
    let fbProvider = new firebase.auth.FacebookAuthProvider();
    fire
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        let {...data} = result.user.providerData[0];
        data['photoURL'] = result.additionalUserInfo.profile.picture.data.url;
        console.log(data);
        setUserDataOnDb(data);
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
      console.log(last_user_data.val());
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
      console.log(data.uid)
      data["username"] = data.fullname + "_" + data.uid;
      let db = fire.database();
      db.ref("/users/" + data.uid).set(data).then(()=>{
        console.log('Data written')
      });
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
      style={{ color: props.color}}
      onClick={facebook_login_handler}
      className={classes.logWithFb}>

      <i className="fab fa-facebook-square"></i>
      <p>Log in with Facebook</p>
    </div>
  );
}

export default LoginWithFb;
