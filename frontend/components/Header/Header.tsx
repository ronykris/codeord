import type { NextPage } from 'next'
import Head from 'next/head'

const Header = () => {
  return (
    <div>
        <h1 className='text-center text-4xl text-white opacity-70 font-bold p-10 font-sans'>
          Welcome to the <span className='text-blue-600 '>Ordverse</span>!
        </h1>
    </div>
    
  )
}

export default Header
