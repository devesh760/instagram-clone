import React,{useState} from 'react';
import classes from './search.module.css'
import {fireDb} from '../../../../firebase/firebase'
import Avatar from '../../../UI/avatar/avatar'
import {Link} from 'react-router-dom'
import Backdrop from '../../../UI/Backdrop/Backdrop'
let Search = (props) =>{
    const [state,setState] = useState({focused:false});
    const [allUsers,setAllUsers]  =  useState(null);
    const [usersList,setUsersList] = useState(null);
    let StyleForIcon = state.focused ? {left:'3%'}:{left: '32%'};
    let StyleForInput = state.focused ? {textAlign:'left'}: {textAlign:'center'};
    function fetchData(){
      if (!allUsers)
        fireDb.getUserNameWithId().then((data) => {
          setAllUsers(data);
        });
    }
    function onfocus(e){
        setState({focused:true});
        fetchData();
    }
    function onblur(e){
        setState({focused:false})
    }
    function liClicked(){
      console.log('li clicked');
    }
    function changeHandler(e){
      let userToSearch = e.target.value;
      if(userToSearch.trim(' ') && allUsers){
        let users = allUsers.map(ob=>{
          if (ob.username.search(userToSearch)!=-1)
            return { ...ob, rank: ob.username.search(userToSearch) };
          return null;
        }).filter((val) => val!==null);
        for(let i=0;i<users.length-1;++i){
          for(let j = i+1;j<users.length;++j){
            let a = users[i].rank;
            let b = users[j].rank;
            if(a>b){
              let temp = users[i];
              users[i] = users[j];
              users[j] = temp;
            }
          }
        }
        users = users.slice(0,users.length<5?users.length:5);
        let userList = users.map(user=>{
          return (
            <Link style={{textDecoration:'none'}} to={`./users/${user.uid}`} key={user.uid}>
              <li onClick={liClicked}>
                {user.photoURL ? <img src={user.photoURL} /> : <Avatar />}
                <p>{user.username}</p>
              </li>
            </Link>
          );
        })
        setUsersList(userList)
      }
    }
    return (
      <div className={classes.searchContainer}>
        <i style={StyleForIcon} className="fas fa-search"></i>
        <input
          onChange={changeHandler}
          style={StyleForInput}
          onFocus={onfocus}
          type="text"
          placeholder="Search"
        />
        {state.focused ? <ul>{usersList}</ul> : null}
        {state.focused?<Backdrop 
        on_click={onblur}/>:null}
      </div>
    );
}
export default Search;