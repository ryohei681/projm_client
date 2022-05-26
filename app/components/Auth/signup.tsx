import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Alert, Button, InputLabel, Snackbar, TextField } from '@mui/material'
import { css } from '@emotion/react'

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
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column;
      `}
    >
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
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            css={css`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 16px;
          `}
        >
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            css={css`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 16px;
          `}
        >
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
          `}
        >
          <Link href={'/login'}>
            <a>すでに登録している人はこちら</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
