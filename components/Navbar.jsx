import React from 'react'
import { BiTask } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-3'> 
    <div className="logo">
        <span className='font-bold  text-2xl mx-8 flex'>iTask<BiTask className='mx-1 my-1' /></span>
    </div>
      <ul className="flex gap-8 mx-10">
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
