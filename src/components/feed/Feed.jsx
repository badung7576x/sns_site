import {React, useEffect} from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from "../../redux/actions/dataActions";

export default function Feed() {
  const dispatch = useDispatch()

  const posts = useSelector(state => state.data.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [])


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share showModal=""/>
        {posts ? posts.map((p) => (
          <Post key={p.id} post={p.post} />
        )) : ''}
      </div>
    </div>
  );
}
