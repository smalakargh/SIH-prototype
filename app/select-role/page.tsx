'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TbSteeringWheel, TbMapPin } from 'react-icons/tb'

export default function SelectRolePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] flex items-center justify-center px-4 py-12 font-poppins">
      <div className="relative w-[92%] sm:w-[80%] lg:w-[60%] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl text-white overflow-hidden shadow-2xl">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#12E0D4]/30 to-transparent blur-[60px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-[#36E0A3]/25 to-transparent blur-[60px]" />

        <div className="relative z-10 px-6 sm:px-10 py-10 space-y-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Choose Your Role</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
            Whether you are navigating the city or guiding others, your journey starts here.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer bg-white/10 ring-1 ring-inset ring-white/10 rounded-xl px-6 py-8 flex flex-col items-center gap-4 hover:bg-white/15 transition"
              >
                <TbSteeringWheel className="text-pink-300 text-3xl" />
                <h3 className="text-lg font-semibold">I’m a Driver</h3>
                <p className="text-white/70 text-sm text-center">Share your live location and help riders track their journey.</p>
              </motion.div>
            </Link>

            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer bg-white/10 ring-1 ring-inset ring-white/10 rounded-xl px-6 py-8 flex flex-col items-center gap-4 hover:bg-white/15 transition"
              >
                <TbMapPin className="text-indigo-300 text-3xl" />
                <h3 className="text-lg font-semibold">I’m a User</h3>
                <p className="text-white/70 text-sm text-center">Track your bus in real time and never miss a stop again.</p>
              </motion.div>
            </Link>
          </div>

          <p className="text-xs text-white/50 italic mt-6">
            “Every journey begins with a login. Let’s drive it forward.”
          </p>
        </div>
      </div>
    </main>
  )
}
