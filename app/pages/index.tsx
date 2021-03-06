import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'styles/Home.module.css'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Link from 'next/link'
import Sidebar from 'components/layout/Sidebar'
import Feed from 'components/layout/Feed'
import Widgets from 'components/layout/Widgets'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>folio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=PT+Serif&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main>
        {/* sidebar */}
        <Sidebar />

        {/* feed */}
        <Feed />

        {/* Widgets */}
        <Widgets />
      </main>

      {/* <main className={styles.main}>
        <CheckCircleOutlineIcon
          className={styles.CheckIcon}
        ></CheckCircleOutlineIcon>
        <h1 className={styles.title}>projm</h1>
        <h2 className={styles.subtitle}>
          ITエンジニアのための制作物投稿プラットフォーム
        </h2>
        <Link href="/signup" passHref>
          <button className={styles.signUpBtn}>Start now</button>
        </Link>
      </main> */}
    </div>
  )
}

export default Home
