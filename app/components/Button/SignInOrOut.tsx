// import type { NextPage } from 'next'
// import Router from 'next/router'
// import { signOut, signInWithEmailAndPassword } from 'firebase/auth'
// import { authentication } from 'config/firebaseApp.config' // Initialize FirebaseApp
// import { useAuthState } from 'react-firebase-hooks/auth'

// const login = () => {
//   signInWithEmailAndPassword(authentication, 'test@test.com', 'password')
// }
// const logout = () => {
//   signOut(authentication)
// }

// type Props = {
//   children: React.ReactNode
// }

// export const SignInOrOut: React.FC<Props> = ({ children }: Props) => {
//   //   const [user, loading] = useAuthState(authentication)

//   //   if (user) {
//   //     return <button onClick={() => signOut(authentication)}>Sign-out</button>
//   //   } else {
//   //     return <button onClick={() => Router.push('/projm')}>Sign-in</button>
//   //   }
//   // }
//   const [user, loading, error] = useAuthState(authentication)

//   if (loading) {
//     return (
//       <div>
//         <p>Initialising User...</p>
//       </div>
//     )
//   }
//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//       </div>
//     )
//   }
//   if (user) {
//     return (
//       <div>
//         <p>Current User: {user.email}</p>
//         <button onClick={logout}>Log out</button>
//       </div>
//     )
//   }
//   return <button onClick={login}>Log in</button>
// }

// export default SignInOrOut
