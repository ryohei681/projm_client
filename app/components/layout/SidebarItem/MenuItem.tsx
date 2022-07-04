import type { NextPage } from 'next'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import styles from './MenuItem.module.css'
import React from 'react'

type MenuItems = {
  text: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

const MenuItem = ({ text, Icon }: MenuItems) => {
  return (
    <div className={styles.menuItem}>
      <Icon className={styles.icon} />
      <span className={styles.iconText}>{text}</span>
    </div>
  )
}

export default MenuItem
