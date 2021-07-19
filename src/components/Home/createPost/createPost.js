import React, { Component } from "react";
import classes from "./createPost.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {fireStorage,fireDb} from '../../../firebase/firebase'
import Loader from '../../UI/Loader/Loader'
import { withRouter } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      video: null,
      showModel: false,
      latestUploadType:null,
      isUploading:false,
      caption:''
    };
  }
  change_handler = (e) => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.files[0] });
    this.setState({latestUploadType: e.target.name})
    this.setState({ showModel: true });
  };
  cancel_btn_handler=()=>{
    this.setState({ showModel: false ,photo:null,video:null});
  }
  upload_on_firebase = (e) => {
    let file_to_upload = this.state[this.state.latestUploadType];
    let storage = new fireStorage(
      this.state.latestUploadType + "s/" + file_to_upload.name
    );
    this.setState({ isUploading: true });
    let options = {
      maxSizeMB: 0.001,
      useWebWorker: true,
    };
    imageCompression(file_to_upload, options).then((file) => {
      storage.setFile(file).on(
        "state_changed",
        (snap) => {
          console.log("state_chaged");
        },
        (err) => {
          console.log("error in file upload: " + err);
        },
        async () => {
          let url = await storage.ref.getDownloadURL();
          let userId = JSON.parse(localStorage.getItem("userData")).uid;
          let db = new fireDb("users/" + userId);
          db.pushPost({
            fileType: this.state.latestUploadType,
            fileurl: url,
            caption: this.state.caption,
            likeCount: 0,
          }).then(() => {
            this.setState({
              photo: null,
              video: null,
              showModel: false,
              latestUploadType: null,
              isUploading: false,
              caption: "",
            });
          });
        }
      );
    });
  };
  captionChange=(e)=>{
     let newCaption = e.target.value;
     this.setState({caption:newCaption});
  }
  render() {
    let ModelToshow = this.state.showModel ? (
      <main>
        <div className={classes.Model}>
          <div className={classes.Imgtxt}>
            <textarea onChange={this.captionChange} placeholder="Write your caption here"></textarea>
            {this.state.latestUploadType==='photo'?
              <img
                src={this.state.photo?URL.createObjectURL(this.state.photo):null}
              />:
              <video controls src={this.state.video?URL.createObjectURL(this.state.video):null}>
              </video>
            }
          </div>
              {
                this.state.isUploading?
                <Loader/>:null
              }
          <div className={classes.ConfirmBtns}>
            <button onClick={this.cancel_btn_handler}>cancel</button>
            <button onClick={this.upload_on_firebase}>Upload</button>
          </div>
        </div>
      </main>
    ) : null;
    return (
      <div className={classes.CreatePost}>
        <div>
          <div className={classes.Wrapper}>
            <label htmlFor="photoInput">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="#e95950"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
              </svg>
              <span>Upload a Photo</span>
            </label>
            <input
              onChange={this.change_handler}
              id="photoInput"
              type="file"
              name="photo"
            />
          </div>
        </div>
        {ModelToshow}
      </div>
    );
  }
}

export default withRouter(CreatePost);
