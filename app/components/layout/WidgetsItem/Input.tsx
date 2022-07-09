import React, { useState } from 'react'
import { Avatar, Snackbar } from '@mui/material'
import { useAuthContext } from 'lib/AuthContext'
import styles from './Input.module.css'
import TextareaAutosize from 'react-textarea-autosize'
import router from 'next/router'
import { firestore } from 'config/firebaseApp.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { url } from 'inspector'

type Props = {}

const Input = (props: Props) => {
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const [description, setDescription] = useState('')
  const [URL, setURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setPoststatus] = useState('n')

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        id: user?.uid,
        description: description,
        url: URL,
        timestamp: serverTimestamp(),
        username: user?.displayName,
      })

      setPoststatus('s')

      setDescription('')
      setURL('')
      setLoading(false)
    } catch (error) {
      setPoststatus('f')
      alert(error)
    }
  }

  const handleClose = () => {
    setPoststatus('n')
  }

  return (
    <>
      {isLoggedIn && (
        <div className={styles.inputPosition}>
          <Snackbar
            open={status == 's'}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            key={'top' + 'center'}
            message="投稿に成功しました"
            onClose={handleClose}
          ></Snackbar>

          <h2 className={styles.widgetsTitle}>制作物を投稿してみましょう！</h2>
          <div className={styles.input}>
            <Avatar>{user?.displayName?.charAt(0)}</Avatar>
            <div className={styles.post}>
              <div
                className={
                  loading ? styles.intextareaPosition : styles.textareaPosition
                }
              >
                <TextareaAutosize
                  className={styles.description}
                  placeholder="説明"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></TextareaAutosize>
                <input
                  className={styles.url}
                  placeholder="url"
                  value={URL}
                  onChange={(e) => setURL(e.target.value)}
                  type="url"
                  pattern="https://.+"
                  title="https://で始まるURLを入力してください。"
                ></input>
              </div>
              <div className={styles.postBtnPosition}>
                <button
                  onClick={sendPost}
                  disabled={!description.trim() || !URL.trim()}
                  className={loading ? styles.inpostBtn : styles.inpostBtn}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Input
