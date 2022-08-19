import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'

export default function AddPostForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(selectAllUsers)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    function onTitleChange(e){
        setTitle(e.target.value)
    } 
    function onContentChange(e){
        setContent(e.target.value)
    }
    function onAuthorChange(e){
        setUserId(e.target.value)
    }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    function onSavePostClick(){
        if (canSave){
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (error) {
                console.error('failed to save the post', error)
            } finally {
                setAddRequestStatus('idle')
            }
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
            <select id='postAuthor' value={userId} onChange={onAuthorChange}>
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
        </form>
    </section>
  ) 
}
