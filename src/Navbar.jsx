import React from 'react'

const Navbar = () => {
  return (
    <div>
        
        <nav className='flex justify-between bg-slate-700 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>iTasks</span>
            </div>
            <ul className='flex gap-8 mx-9 text-xl'>
                <li className='cursor-pointer hover:font-bold transition-all duration-75'>HOME</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
