import React from 'react'
import styles from './Feed.module.css'

type Props = {}

const Feed = (props: Props) => {
  return (
    <div className={styles.feed}>
      <div className={styles.Home}>
        <h2 className={styles.title}>Home</h2>
      </div>
    </div>
  )
}

export default Feed
