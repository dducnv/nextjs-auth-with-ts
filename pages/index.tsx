import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/use-auth'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter()
  const { profile, login, logout } = useAuth({
    revalidateOnMount:false
  });
  async function handleLogin() {
    try {
      await login();
      router.push('/auth-page')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <p>{JSON.stringify(profile || null)}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
