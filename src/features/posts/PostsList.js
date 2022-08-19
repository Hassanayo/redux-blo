import { useSelector} from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
} from "./postsSlice";


export default function PostsList() {

  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const posts = useSelector(selectAllPosts);

  


  
  let content;
  if (postStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt   post={post}/>
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>
  }
  return (
    <section>
      {content}
    </section>
  );
}
