import React from 'react'
import { Avatar } from '@mui/material'
import { useAuthContext } from 'lib/AuthContext'
import styles from './Input.module.css'
import TextareaAutosize from 'react-textarea-autosize'

type Props = {}

const Input = (props: Props) => {
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  return (
    <div className={styles.inputPosition}>
      <h2 className={styles.widgetsTitle}>制作物を投稿してみましょう！</h2>
      <div className={styles.input}>
        <Avatar>{user?.email?.charAt(0)}</Avatar>
        <div className={styles.post}>
          <div className={styles.textareaPosition}>
            <TextareaAutosize
              className={styles.description}
              placeholder="説明"
            ></TextareaAutosize>
            <TextareaAutosize
              className={styles.url}
              placeholder="url"
            ></TextareaAutosize>
          </div>
          <div className={styles.postBtnPosition}>
            <button className={styles.postBtn}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input
