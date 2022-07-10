import React from 'react'
import Input from './WidgetsItem/Input'
import styles from './Widgets.module.css'

type Props = {}

const Widgets = (props: Props) => {
  return (
    <div className={styles.widgets}>
      <Input />
    </div>
  )
}

export default Widgets
