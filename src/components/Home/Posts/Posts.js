import React, { useEffect, useState } from 'react';
import classes from './Posts.module.css';
import Post from './Post/Post';
import {fireDb} from "../../../firebase/firebase";

function Posts (props) {
        let POSTS_TO_SHOW = null;
        let [data, setData] = useState(null);
        if (data) {
          POSTS_TO_SHOW = data.map((el) => {
            let commentsArr
            if(el.comments) 
             commentsArr = Object.values(el.comments);
            return (
              <Post
                key={Math.random() * 10002010}
                profile_pic={el.profile_pic}
                username={el.name}
                image={el.fileurl}
                caption = {el.caption}
                id = {el.id}
                idx = {el.post_no}
                comments= {commentsArr}
              />
            );
          });
        }
        useEffect(() => {
          let ans = fireDb.getTwentyPosts();
          ans.then((data1) => {
              console.log(data1)
            setData(data1);
          });
        },[]);

        return <div className={classes.Posts}>{POSTS_TO_SHOW}</div>;
}
export default Posts;