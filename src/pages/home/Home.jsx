import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useSelector } from "react-redux";

export default function Home() {
  const posts = useSelector((state) => state.data.posts);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div style={{flex: 3}}></div>
        <Feed posts={posts}/>
        {/* <div style={{flex: 3}}></div> */}
        <Rightbar />
      </div>
    </>
  );
}
