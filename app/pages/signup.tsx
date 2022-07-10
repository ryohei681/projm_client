import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Alert, Button, InputLabel, Snackbar, TextField } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import styles from 'styles/Auth.module.css'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, firestore } from 'config/firebaseApp.config'
import { useAuthContext } from 'lib/AuthContext'

const Signup = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser!, {
        displayName: username,
      })

      router.push('/')
    } catch (error) {
      alert(error)
    }
  }
  const handleClose = async () => {
    await router.push('/')
  }

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <div className={styles.signup}>
      {/* <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        key={'top' + 'center'}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar> */}
      <AccountCircleOutlinedIcon
        className={styles.accountIcon}
      ></AccountCircleOutlinedIcon>
      <h1 className={styles.signupTitle}>Sign up</h1>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.usernameBoxPosition}>
          <input
            className={styles.usernameBox}
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChangeUsername}
            required
          ></input>
        </div>
        <div className={styles.emailBoxPosition}>
          <input
            className={styles.emailBox}
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChangeEmail}
            required
          ></input>
        </div>
        <div className={styles.passwordBoxPosition}>
          <input
            className={styles.passwordBox}
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChangePassword}
            required
          ></input>
        </div>
        <div className={styles.signupBtnPlace}>
          <button type="submit" className={styles.signupBtn}>
            Sign up
          </button>
        </div>
        <div className={styles.alreadySignup}>
          すでに登録している人は
          <Link href={'/signin'}>
            <a>こちら</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
