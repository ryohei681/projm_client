import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Alert, Button, InputLabel, Snackbar, TextField } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import styles from 'styles/Auth.module.css'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from 'lib/AuthContext'
import { auth } from 'config/firebaseApp.config'

const Signin = () => {
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (error) {
      alert(error)
    }
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const handleClose = async () => {
    await router.push('/')
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
      </Snackbar>
      <Snackbar
        open={!isLoggedIn}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        key={'top' + 'center'}
      >
        <Alert severity="warning">ログインしてください</Alert>
      </Snackbar> */}
      <AccountCircleOutlinedIcon
        className={styles.accountIcon}
      ></AccountCircleOutlinedIcon>
      <h1 className={styles.signupTitle}>Sign in</h1>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
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
            Sign in
          </button>
        </div>
        <div className={styles.alreadySignup}>
          ユーザ登録は
          <Link href={'/signup'}>
            <a>こちら</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin
