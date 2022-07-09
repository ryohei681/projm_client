import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth, firestore } from 'config/firebaseApp.config'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

export type UserType = User | null

export type AuthContextProps = {
  user: UserType
}

export type AuthProps = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType>(null)
  const value = {
    user,
  }

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      console.log(user)
      console.log('pass1')
      if (user != undefined && user != null) {
        const docRef = doc(firestore, 'users', user?.uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          console.log('pass2')
          await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            // username: user.displayName.split(' ').join('').toLocaleLowerCase(),
            userImg: user.photoURL,
            uid: user.uid,
            timestamp: serverTimestamp(),
          })
        }
      }
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
