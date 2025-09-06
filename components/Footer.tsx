'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { TbHeartHandshake } from 'react-icons/tb'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="w-full flex justify-center mt-[100px] sm:mt-[150px] pb-[60px]">
      <div className="relative w-[92%] sm:w-[80%] lg:w-[70%] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl text-white overflow-hidden font-poppins">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#12E0D4]/30 to-transparent blur-[60px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-[#36E0A3]/25 to-transparent blur-[60px]" />

        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/10 ring-1 ring-inset ring-white/10">
                  <TbHeartHandshake className="text-pink-300 text-xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight">NavigateMe</h3>
              </div>
              <p className="text-white/80 text-[13px] sm:text-[15px] leading-relaxed max-w-[30ch] sm:max-w-none">
                Clarity, connection, and confident travel. We guide your city journeys with heart.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white/80">Links</h4>
              <nav className="flex sm:flex-col gap-2 text-[13px] text-white/80">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#routes" className="hover:text-white transition-colors">Live Routes</a>
                <a href="#docs" className="hover:text-white transition-colors">Docs</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              </nav>
            </div>

            {/* Stay in the loop */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white/80">Stay in the loop</h4>
              <div className="w-full max-w-sm flex items-center gap-2 rounded-full ring-1 ring-inset ring-white/15 bg-white/5 px-3 py-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent text-[13px] placeholder:text-white/50 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="shrink-0 px-4 py-2 rounded-full bg-white text-[#042830] text-xs font-semibold"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px w-full bg-white/10" />

          {/* Bottom row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/60">© {new Date().getFullYear()} NavigateMe. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                className="grid place-items-center h-9 w-9 rounded-full ring-1 ring-inset ring-white/15 bg-white/5 text-white/80 hover:text-white"
              >
                <FaGithub size={16} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                className="grid place-items-center h-9 w-9 rounded-full ring-1 ring-inset ring-white/15 bg-white/5 text-white/80 hover:text-white"
              >
                <FaLinkedin size={16} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                className="grid place-items-center h-9 w-9 rounded-full ring-1 ring-inset ring-white/15 bg-white/5 text-white/80 hover:text-white"
              >
                <FaTwitter size={16} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
