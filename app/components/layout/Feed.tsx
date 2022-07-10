import { firestore } from 'config/firebaseApp.config'
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styles from './Feed.module.css'
import Post from './Post'

type Props = {}

const Feed = (props: Props) => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot: QuerySnapshot<DocumentData>) => {
          setPosts(snapshot.docs)
        },
      ),
    [],
  )
  return (
    <div className={styles.feed}>
      <div className={styles.Home}>
        <h2 className={styles.title}>Home</h2>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
