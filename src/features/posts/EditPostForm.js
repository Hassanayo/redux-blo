import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";


export default function EditPostForm() {
    const {postId} = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)
    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')
    
    const dispatch = useDispatch()
    if (!post) {
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    function onTitleChange(e){
        setTitle(e.target.value)
    } 
    function onContentChange(e){
        setContent(e.target.value)
    }
    function onAuthorChange(e){
        setUserId(Number(e.target.value))
    }
    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'
    function onSavePostClick(){
        if (canSave){
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id,title, body: content, userId, reactions: post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (error) {
                console.error('Failed to save the post', error)
            } finally {
                setRequestStatus('idle')
            }
        }
    }
    function onDeletePostClicked(){
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (error) {
            console.error('Failed to delete the post', error)
        } finally {
            setRequestStatus('idle')
        }
    }
    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
  return (
    <section>
        <h2>Add a new post</h2>
        <form>
            <label htmlFor='postTitle'>post Title:</label>
            <input
                type="text"
                id='postTitle'
                name="postTitle"
                value={title}
                onChange={onTitleChange}
            />
            <label htmlFor='postAuthor'>Author:</label>
            <select id='postAuthor' defaultValue={userId} value={userId} onChange={onAuthorChange}>
                <option value=""></option>
                {usersOptions}
            </select>
            <label htmlFor='postContent'>Content:</label>
            <textarea
                id='postContent'
                name='postContent'
                value={content}
                onChange={onContentChange}
            />
            <button onClick={onSavePostClick} type='button' disabled={!canSave}>Save Post</button>
            <button onClick={onDeletePostClicked} type='button' className="deleteButton">Delete Post</button>
        </form>
    </section>
  )
}
