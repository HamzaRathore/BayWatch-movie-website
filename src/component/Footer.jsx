import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-2'>
        <div className='flex items-center justify-center gap-4 '>
          <Link className='hover:text-white hover:underline' to="/" >About</Link>
          <Link className='hover:text-white hover:underline' to="/">Contact</Link>
        </div>
        <p className='text-sm'>Created By Hamza Rathore</p>
    </footer>
  )
}

export default Footer