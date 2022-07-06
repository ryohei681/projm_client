import React from 'react'
import Logo from './SidebarItem/Logo'
import MenuItem from './SidebarItem/MenuItem'
import HomeIcon from '@mui/icons-material/Home'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import styles from './Sidebar.module.css'

import { signOut } from 'firebase/auth'
import { auth } from 'config/firebaseApp.config'
import { useAuthContext } from 'lib/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {}

const Sidebar = (props: Props) => {
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const router = useRouter()
  const handleLogout = async () => {
    await signOut(auth)
    await router.push('/')
  }
  return (
    <div className={styles.sidebar}>
      {/* logo */}
      <Logo />

      {/* menu */}
      <div className={styles.sidebarMenuItems}>
        <MenuItem text="Home" Icon={HomeIcon} />
        {isLoggedIn && (
          <>
            <MenuItem text="Rank" Icon={MilitaryTechOutlinedIcon} />
            <MenuItem text="Profile" Icon={PermIdentityOutlinedIcon} />
          </>
        )}
      </div>

      {isLoggedIn ? (
        <>
          {/* button */}
          <div className={styles.postBtnPosition}>
            <button className={styles.postBtn}>Post</button>
          </div>

          {/* signOut */}
          <div className={styles.signOut} onClick={handleLogout}>
            SignOut
          </div>
        </>
      ) : (
        <>
          <div className={styles.signIn} onClick={() => router.push('/signin')}>
            SignIn
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar
