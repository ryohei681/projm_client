import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Avatar } from '@mui/material'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import Moment from 'react-moment'
import React from 'react'
import router from 'next/router'
import { useAuthContext } from 'lib/AuthContext'
import styles from './Post.module.css'
import Link from 'next/link'

type Props = {
  post: QueryDocumentSnapshot<DocumentData>
}

const Post = ({ post }: Props) => {
  const { user } = useAuthContext()
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
          <a href={post.data().url}>{post.data().url}</a>
        </p>

        {/* {icons} */}
        <div className={styles.icons}>
          <div>
            <ChatOutlinedIcon className={styles.icon} />
          </div>
          {user?.uid === post.data().id && (
            <DeleteForeverOutlinedIcon className={styles.icon} />
          )}
          <div>
            <FavoriteBorderOutlinedIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
