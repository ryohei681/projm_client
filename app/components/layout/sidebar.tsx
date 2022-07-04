import React from 'react'
import Logo from './SidebarItem/Logo'
import MenuItem from './SidebarItem/MenuItem'
import HomeIcon from '@mui/icons-material/Home'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import styles from './Sidebar.module.css'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className={styles.sidebar}>
      {/* logo */}
      <Logo />

      {/* menu */}
      <div className={styles.sidebarMenuItems}>
        <MenuItem text="Home" Icon={HomeIcon} />
        <MenuItem text="Rank" Icon={MilitaryTechOutlinedIcon} />
        <MenuItem text="Profile" Icon={PermIdentityOutlinedIcon} />
      </div>

      {/* button */}
    </div>
  )
}

export default Sidebar
