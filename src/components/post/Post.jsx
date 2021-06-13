import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import moment from 'moment'
import { useSelector } from "react-redux";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likeCounts)
  const [isLiked, setIsLiked] = useState(false)

  const users = useSelector(state => state.data.users)
  const postUser = users.find(user => user.id === post.userId)

  const likeHandler =()=>{
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={postUser?.user.avatar || 'assets/no_avatar.png'}
              alt="avatar"
            />
            <div className='titleBox'>
              <span className="postUsername">
                {postUser.user.nickname}
              </span>
              <span className="postDate">
                {moment(post.createdAt.toDate()).toNow(true)}
              </span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
          <img className="postImg" src={post?.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="icon" src="assets/like.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">コメント{post?.commentCounts || 0}件</span>
          </div>
        </div>
      </div>
    </div>
  );
}
