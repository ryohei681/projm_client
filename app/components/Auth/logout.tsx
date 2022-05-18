import { auth } from "config/firebaseApp.config"
import { signOut } from "firebase/auth"
import { useRouter } from "next/router"

const router = useRouter()
const handleLogout = async () => {
  await signOut(auth)
  await router.push("/")
}