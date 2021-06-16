import { useEffect, useState } from "react";
import moment from 'moment'
import 'moment/locale/ja';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import {CardHeader, CardMedia, Grid, CardContent, CardActions, Collapse, Avatar, IconButton, Typography} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { likePost, commentPost } from "../../redux/actions/dataActions";
import firebase from "firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '15px 0',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  left: {
    marginLeft: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    border: '1px solid #1775ee',
  },
  commentBox: {
    borderTop: '1px solid #ccc',
    marginBottom: "10px",
  },
  commentInput: {
    width: '95%',
    border: '1px solid #ccc',
    padding: '10px 10px',
    borderRadius:' 100px',
    fontSize: '18px'
  }
}));

export default function Post({ post }) {
  const user = useSelector(state => state.user)
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.credentials?.userId))
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post.comments || [])
  const users = useSelector(state => state.data.users)
  const postUser = users.find(user => user.id === post.userId)

  
  const dispatch = useDispatch()

  useEffect(() => {
    if(!user.authenticated) {
      setIsLiked(false)
    } else {
      setIsLiked(post.likes.includes(user.credentials?.userId))
    }
  }, [user, post])

  const handleLike =()=>{
    if(user.authenticated) {
      const likesUpdate = isLiked ? post.likes.filter(uId => uId !== user.credentials.userId) : [...post.likes, user.credentials.userId]
      setIsLiked(!isLiked)
      setLike(likesUpdate.length)
      dispatch(likePost(post.id, {likes: likesUpdate}))
    }
  }

  const handleComment =(e)=>{
    if (e.key === 'Enter' && user.authenticated && comment.trim()) {
      const newComment = {
        userId: user.credentials.userId,
        content: comment.trim(),
        createdAt: firebase.firestore.Timestamp.now()
      }
      setComments([...comments, newComment])
      setComment('')
      dispatch(commentPost(post.id, {comments: [...comments, newComment]}))
    }
  }
  

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={postUser?.user.avatar || 'assets/no_avatar.png'} className={classes.avatar}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <h4 style={{ margin: 0, fontSize: '20px' }}>{postUser?.user.nickname}</h4>
        }
        subheader={
          <span style={{fontSize: '16px'}} >{moment(post?.createdAt.toDate()).fromNow()}</span>
        }
      />
      {post?.image && <CardMedia
        className={classes.media}
        image={post?.image}
        title="Image"
      />}
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {post?.content}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton 
          color={isLiked ? 'secondary' : 'default'}
          onClick={handleLike}
          >
          <FavoriteIcon />
        </IconButton> {like}

        <div className={classes.left}>
          コメント{comments.length || 0}件
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            > 
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments ? comments.map((c, i) => {
            const commentUser = users.filter((u) => u.id === c.userId)[0]?.user
            return (
              <Grid container spacing={2} key={i} className={classes.commentBox}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src={commentUser?.avatar || 'assets/no_avatar.png'} className={classes.avatar}/>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>{commentUser?.nickname}</h4>
                  <p style={{ textAlign: "left", color: "gray", fontSize: '14px' }}>
                    {moment(c.createdAt.toDate()).fromNow()}
                  </p>
                  <p style={{ textAlign: "left", marginTop: '10px' }}>
                    {c.content}
                  </p>
                </Grid>
              </Grid>
            )
          }) : ""}
          { user.authenticated && (
            <Grid container wrap="nowrap" spacing={2} style={{borderTop: '1px solid #ccc', paddingTop: '5px'}}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={user.credentials?.avatar || 'assets/no_avatar.png'} className={classes.avatar}/>
              </Grid>
              <Grid item xs zeroMinWidth>
                <input
                  placeholder="コメントする"
                  className={classes.commentInput}
                  value = {comment}
                  onChange={e => setComment(e.target.value)}
                  onKeyDown={handleComment}
                />
              </Grid>
            </Grid>)}
        </CardContent>
      </Collapse>
    </Card>
  );
}