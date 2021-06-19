import React, { useEffect, useReducer, useState } from 'react'
import Navbar from '../../Home/NavBar/Navbar';
import classes from "./EditProfile.module.css";
import Avatar from '../../UI/avatar/avatar'
import {fireDb,fireStorage} from '../../../firebase/firebase'
import imageCompression from "browser-image-compression";
let reducer = (state,action)=>{
    switch(action.type){
        case 'name':
            return {...state , name:action.value};
        case 'username':
            return {...state , username: action.value}
        case 'bio':
            return {...state , bio: action.value}
        case 'email':
            return {...state , email: action.value}
        case 'phoneNo':
            return {...state, phoneNo: action.value}
        case 'photo':
            return {...state , photo: action.value}
        default:
            return state;
    }
}
function EditProfile(){
    let [state,dispatch] = useReducer(reducer,{name:'',username: '' , email: '',  bio: '' , phoneNo: '' ,photo:''})
    let [userData,setUserData] = useState(null);
    useEffect(()=>{
        let uid = JSON.parse(localStorage.getItem('userData')).uid;
        fetchUserData(uid)
    },[])
    function changeHandler(e){
        dispatch({
            type:e.target.id,
            value:e.target.value
        })
    }
    function fetchUserData(id){
        fireDb.getDataById(id).then(data=>{
          setUserData(data);
          dispatch({
            type:'name',
            value:data.fullname
          })
          dispatch({
            type:'username',
            value:data.username
          })
          dispatch({
            type:'email',
            value:data.email
          })
          dispatch({
            type:'photo',
            value:data.photoURL
          })
          console.log(data)
        })
    }
    function photoChangeHandler(e){
      let uid = JSON.parse(localStorage.getItem('userData')).uid;
      let file_to_upload = e.target.files[0];
       console.log(e)
       let storage = new fireStorage(
         `photos/myprofile${uid}.png`
       );
       let options = {
         maxSizeMB: 0.01,
         useWebWorker: true,
       };
       imageCompression(file_to_upload,options).then(file=>{
         storage.setFile(file).on("state changed",(snap)=>{
           console.log(snap)
         },(err)=>{
           console.log('file can not be uploaded' + err)
         }, async ()=>{
           let url = await storage.ref.getDownloadURL();
           dispatch({
             type:'photo',
             value:url
           })
         })
       })
    }
    function submitForm(e){
      e.preventDefault()
      let uid = JSON.parse(localStorage.getItem("userData")).uid;
      let {...data} = userData;
       data.fullname = state.name
       data.email = state.email
       data.username = state.username
       data["bio"] = state.bio
       data.photoURL = state.photo
       let db = new fireDb(`users`);
       db.setData(data,uid).then(snap=>{
         console.log('data setted'+ snap)
       })
    }
    return (
      <div className={classes.container}>
        <div className={classes.navContainer}>
          <Navbar />
        </div>
        <main className={classes.editMain}>
          <div className={classes.photoUpload}>
            {state.photo?<img src={state.photo}/>:<Avatar />}
            <aside>
              <p>Username</p>
              <label htmlFor='photo'>Change Profile Photo</label>
              <input onChange={photoChangeHandler} id='photo' type="file"/>
            </aside>
          </div>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                value={state.name}
                onChange={changeHandler}
                id="name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                value={state.username}
                onChange={changeHandler}
                id="username"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <textarea
                value={state.bio}
                onChange={changeHandler}
                rows="5"
                id="bio"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={state.email}
                onChange={changeHandler}
                id="email"
                type="email"
              />
            </div>
            <div>
              <label htmlFor="phoneNo">Phone no</label>
              <input
                value={state.phoneNo}
                id="phoneNo"
                onChange={changeHandler}
                type="number"
              />
            </div>
            <button onClick={submitForm} type="submit">submit</button>
          </form>
        </main>
      </div>
    );
}

export default EditProfile;