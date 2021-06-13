import { React, useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import { Modal, Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import "./feed.css";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions";

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

export default function Feed() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const posts = useSelector((state) => state.data.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    var cont = document.getElementById("post-content").value;
    setDraft(cont);
  };

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
          <Button key="submit" type="primary" variant="outlined">
            Post
          </Button>
        </div>
      </Modal>
      <div className="feedWrapper">
        <Share showModal={handleOpen} content={draft} />
        {posts ? posts.map((p) => <Post key={p.id} post={p.post} />) : ""}
      </div>
    </div>
  );
}
