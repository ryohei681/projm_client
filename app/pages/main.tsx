import type { NextPage } from 'next'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import { useAuthContext } from 'lib/AuthContext'

const Projm: NextPage = () => {
  const { user } = useAuthContext()
  return (
    <div>
      <h1>ようこそ{user!.email}</h1>
      <Link href="/post">
        <IconButton>
          <AddCircleIcon sx={{ fontSize: 50 }}></AddCircleIcon>
        </IconButton>
      </Link>
    </div>
  )
}

export default Projm
