'use client'

import React, { useState } from 'react'
import { TbLayoutDashboard, TbMap, TbRoute, TbMessageCircle, TbX } from 'react-icons/tb'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Dashboard', icon: <TbLayoutDashboard />, target: 'dashboard' },
  { label: 'Map', icon: <TbMap />, target: 'map' },
  { label: 'Routes', icon: <TbRoute />, target: 'routes' },
  { label: 'Feedback', icon: <TbMessageCircle />, target: 'chat' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (window.innerWidth < 768) setOpen(false) // auto-close on mobile
  }

  return (
    <>
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-white/10 text-white p-2 rounded-full backdrop-blur-md hover:bg-white/20 transition md:hidden"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed md:static top-0 left-0 z-40 h-full w-64 md:w-auto bg-black/30 backdrop-blur-xl border-r border-white/10 p-4 space-y-6"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center md:hidden">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  NavigateMe
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition"
              >
                <TbX size={24} />
              </button>
            </div>

            {/* Logo (desktop) */}
            <div className="hidden md:block text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                NavigateMe
              </span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 text-sm">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.target)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition w-full"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
