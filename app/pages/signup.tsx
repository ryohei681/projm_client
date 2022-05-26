import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Alert, Button, InputLabel, Snackbar, TextField } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import styles from 'styles/Signup.module.css'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebaseApp.config'
import { useAuthContext } from 'lib/AuthContext'

const Signup = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    router.push('/main')
  }
  const handleClose = async () => {
    await router.push('/')
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  return (
    <div className={styles.signup}>
      <Snackbar
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
      <AccountCircleOutlinedIcon
        className={styles.accountIcon}
      ></AccountCircleOutlinedIcon>
      <h1 className={styles.signupTitle}>Sign up</h1>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.emailBox}
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChangeEmail}
            required
          ></input>
        </div>
        <div>
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
          <Link href={'/login'}>
            <a>こちら</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
