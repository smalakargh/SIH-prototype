'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { TbLocationPin } from 'react-icons/tb'

function Navbar() {
  return (
    <main className="w-full flex justify-center absolute top-[30px] sm:top-[60px] flex-wrap gap-[140px]">
      <nav className="w-[90%] sm:w-[60%] bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-full h-[60px] flex justify-between items-center px-6">
        <div className="text-white font-caveat flex items-center text-[1.2rem] sm:text-[1.6rem] gap-1">
          <TbLocationPin /> NavigateMe
        </div>

        <motion.div
          whileHover={{
            scale: 1.1,     
            backgroundColor: "#f0f0f0",
            boxShadow: "0px 4px 12px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="font-poppins bg-white text-black font-[500] text-[13px] sm:text-[14px] sm:px-5 px-4 sm:py-2 py-[7px] rounded-full flex justify-center items-center cursor-pointer"
        >
          Login
        </motion.div>
      </nav>
      <div className='flex flex-col justify-center items-center font-poppins gap-8'>
        <div className='w-[90%] sm:w-[60%] text-[40px] font-[700] text-center'>Live routes. Local clarity. NavigateMe delivers..</div>
        <div className='flex gap-3'>
        <motion.div
          whileHover={{
            scale: 1.1,     
            backgroundColor: "#f0f0f0",
            boxShadow: "0px 4px 12px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white text-black font-[500] text-[13px] sm:text-[17px] sm:px-5 px-3 py-2 rounded-full flex justify-center items-center cursor-pointer"
        >
          GET STARTED
        </motion.div>
        <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0px 4px 12px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/10 text-white font-[500] text-[13px] sm:text-[17px] sm:px-5 px-3 py-2 rounded-full flex justify-center items-center cursor-pointer border border-white/30 backdrop-blur-md"
        >
          LEARN MORE
        </motion.div>

          <button></button>
        </div>
      </div>
    </main>
  )
}

export default Navbar