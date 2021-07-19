import React, { useEffect, useRef, useState } from 'react';
import classes from "./Post.module.css";
import {fireDb} from  '../../../../firebase/firebase'
import Avatar from '../../../UI/avatar/avatar'
import {Link} from 'react-router-dom'

function Post({profile_pic,username,image,caption,id,idx,comments}) {
   let [allComments,setAllcomments] = useState(comments)
   let [comment,changeComment] = useState('');
   let inputref = useRef();
   let commentChange = (e)=>{
      changeComment(e.target.value);
   }
   let postComment = ()=>{
      let myusername =JSON.parse(localStorage.getItem('userData')).fullname;
      fireDb.addComment(id,idx,myusername,comment).then(d=>d).then(ans=>{
        console.log(ans)
      })
      let obj = {};
      obj[myusername] = comment;
      if(allComments){
        let [...comments] = allComments;
        comments.push({...obj});
        setAllcomments(comments);
      }
      else{
         let arr = new Array(obj);
         setAllcomments(arr);
      }
      inputref.current.value = ''
   }
      let comments_to_show = null;
      if (allComments) {
        comments_to_show = allComments.map((comment) => {
          let name = Object.keys(comment)[0];
          let com = Object.values(comment)[0];
          return (
            <div key={Math.random() * 10000000}>
              <h5>{name}: </h5>
              {com}
            </div>
          );
        });
      }
    return (
      <div className={classes.Post}>
        <header>
          <aside>
            {profile_pic ? (
              <img src={profile_pic} alt="img" />
            ) : (
              <div>
                <Avatar />
              </div>
            )}
            <span>
              <Link style={{textDecoration:'none', color:'#000'}} to={`/users/${id}`}>{username}</Link>
            </span>
          </aside>
          <aside>
            <svg
              aria-label="More options"
              fill="#262626"
              height="16"
              viewBox="0 0 48 48"
              width="16"
            >
              <circle
                clipRule="evenodd"
                cx="8"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="24"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="40"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
            </svg>
          </aside>
        </header>
        <div className={classes.ImgCont}>
          <img draggable="false" loading="eager" src={image} alt="" />
        </div>
        <footer>
          <section>
            <div className={classes.caption}>
              <h5>{username}</h5>: {caption}
            </div>
            <div className={classes.displayComment}>{comments_to_show}</div>
          </section>
          <div className={classes.comment}>
            <svg
              aria-label="Emoji"
              fill="#262626"
              height="24"
              viewBox="0 0 48 48"
              width="24"
            >
              <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
              <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
            </svg>
            <input
              ref={inputref}
              onChange={commentChange}
              placeholder=" Add a comment..."
              type="text"
            />
            <button onClick={postComment}>Post</button>
          </div>
        </footer>
      </div>
    );
}

export default Post;
