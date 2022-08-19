import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectAllPosts } from "../posts/postsSlice"
import { selectUserById } from "./usersSlice"
export default function UserPage() {
    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postsForUSer = useSelector(state => {
        const allPosts = selectAllPosts(state)
        return allPosts.filter(post => post.userId === Number(userId))
    })
    const postTitles = postsForUSer.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
  return (
    <section>
        <h2>{user?.name}</h2>
        <ol>{postTitles}</ol>
    </section>
  )
}
