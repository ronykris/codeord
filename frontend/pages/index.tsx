import type { NextPage } from 'next'
import Head from 'next/head'
import FocusGraph from '../components/Graphs/GraphWrapper'
//import styles from '../styles/Home.module.css'
import axios from 'axios'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Codeord</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='text-center text-2xl font-bold'>
          Welcome to CODE Ord!
        </h1>
        <FocusGraph />
      </main>
    </div>

  )
}

export default Home
