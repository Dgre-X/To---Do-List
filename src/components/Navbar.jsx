import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-800 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-9'>DgreX</span>
      </div>
        <ul className="flex gap-5 mx-9">
            <li className='cursor-pointer hover:font-bold hover:text-violet-300 transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold hover:text-violet-300 transition-all'>About</li>
            <li className='cursor-pointer hover:font-bold hover:text-violet-300 transition-all'>Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
