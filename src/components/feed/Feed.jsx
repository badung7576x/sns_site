import { React, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import { Modal, Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import "./feed.css";
import { writePost } from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { useEffect } from "react";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  input_content: {
    width: 300,
    height: 50,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
  },
  image_input: {
    display: "none",
  },
}));

export default function Feed({posts}) {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [visibility, setVisibility] = useState("none");
  const [draftImg, setDraftImg] = useState(null);
  const [passImg, setPassImg] = useState(null);
  const [listPosts, setListPosts] = useState(posts);

  useEffect(() => {
    setListPosts(posts)
  }, [posts])

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    var cont = document.getElementById("post-content").value;
    setDraft(cont);
  };

  const readURL = info => {
    const input = info.target;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            setDraftImg(e.target.result);
        };
  
        reader.readAsDataURL(input.files[0]);
        setPassImg(info.target.files[0]);
        setVisibility("block");
    }
  }

  const handleSubmit = () => {
    if (user.authenticated) {
      var cont = document.getElementById("post-content").value;

      const newPost = {
        userId: user.credentials.userId,
        content: cont,
        likes: [],
        comments: [],
        createdAt: firebase.firestore.Timestamp.now()
      }
      setDraftImg(null);
      setDraft("");
      setVisibility("none");
      setOpen(false);
      //dispatch(commentPost(post.id, {comments: [...comments, newComment]}))
      writePost(newPost, passImg);
      setTimeout(function() {
        window.location.reload(true);
      }, 3000);
    }
  }

  return (
    <div className="feed">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title" align="middle">
            投稿を作成
          </h2>
          <Input
            className={classes.input_content}
            id="post-content"
            type="text"
            placeholder="What's on your mind?"
            defaultValue={draft}
            multiline={true}
          />
          <br></br>
          <br></br>
          <br></br>
          <input
            accept="image/*"
            className={classes.image_input}
            id="icon-button-file"
            type="file"
            onChange={readURL}
          />
          <label htmlFor="icon-button-file">
            <Button
              color="primary"
              aria-label="upload picture"
              component="span"
              variant="outlined"
            >
              <PhotoCameraOutlinedIcon />
            </Button>
          </label>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <Button key="submit" type="primary" variant="outlined" onClick={handleSubmit}>
            Post
          </Button>
          <br></br>
          <br></br>
          <img id="preview" src={draftImg} alt="preview" 
              style={{display: visibility, maxWidth: 180}}
          />
        </div>
      </Modal>
      <div className="feedWrapper">
        { user.authenticated && <Share showModal={handleOpen} content={draft} /> }
        {listPosts && listPosts.map((p) => <Post key={p.id} post={{...p.post, 'id': p.id}}/>)}
      </div>
    </div>
  );
}
