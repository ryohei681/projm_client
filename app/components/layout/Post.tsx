import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Avatar } from '@mui/material'
import {
  setDoc,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
  QuerySnapshot,
  doc,
  collection,
} from 'firebase/firestore'
import Moment from 'react-moment'
import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { useAuthContext } from 'lib/AuthContext'
import styles from './Post.module.css'
import Link from 'next/link'
import { firestore } from 'config/firebaseApp.config'

type Props = {
  post: QueryDocumentSnapshot<DocumentData>
}

const Post = ({ post }: Props) => {
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [comments, setComments] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'posts', post.id, 'likes'),
      (snapshot: QuerySnapshot<DocumentData>) => setLikes(snapshot.docs),
    )
  }, [firestore])

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1)
  }, [likes, user])

  async function likePost() {
    if (isLoggedIn) {
      if (hasLiked) {
        await deleteDoc(doc(firestore, 'posts', post.id, 'likes', user?.uid))
      } else {
        await setDoc(doc(firestore, 'posts', post.id, 'likes', user?.uid), {
          username: user?.displayName,
        })
      }
    } else {
      // signIn();
      router.push('/auth/signin')
    }
  }

  async function deletePost() {
    if (window.confirm('この投稿を削除しても良いですか?')) {
      deleteDoc(doc(firestore, 'posts', post.id))

      router.push('/')
    }
  }

  return (
    <div className={styles.post}>
      {/* {user image} */}
      <Avatar className={styles.userImage}>
        {post.data().username.charAt(0)}
      </Avatar>
      {/* {right side} */}
      <div className={styles.rightSide}>
        {/* {Header} */}
        <div className={styles.header}>
          {/* {user info} */}
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{post.data().username}</h1>
            <span className={styles.time}>
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* {dot icon} */}
          <MoreHorizIcon className={styles.icon} />
        </div>

        {/* {post text} */}

        <p onClick={() => router.push(`/posts/${id}`)}>
          {post.data().description}
        </p>
        <p>
          url:
          <a className={styles.url} href={post.data().url}>
            {post.data().url}
          </a>
        </p>

        {/* {icons} */}
        <div className={styles.icons}>
          <div>
            <ChatOutlinedIcon className={styles.icon} />
          </div>
          {user?.uid === post.data().id && (
            <DeleteForeverOutlinedIcon
              onClick={deletePost}
              className={styles.icon}
            />
          )}
          <div className={styles.heart}>
            {hasLiked ? (
              <FavoriteIcon
                className={`${styles.icon} ${styles.changeIcon}`}
                onClick={likePost}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                className={styles.icon}
                onClick={likePost}
              />
            )}
            {likes.length > 0 && (
              <span
                className={hasLiked ? styles.totalLikes : styles.intotalLikes}
              >
                {' '}
                {likes.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
