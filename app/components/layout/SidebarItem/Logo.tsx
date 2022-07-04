import type { NextPage } from 'next'
import styles from './Logo.module.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckIcon from '@mui/icons-material/Check'

const Logo: NextPage = () => {
  return (
    <div className={styles.logo}>
      <CheckIcon className={styles.CheckIcon}></CheckIcon>
      <h1 className={styles.title}>projm</h1>
    </div>
  )
}

export default Logo
