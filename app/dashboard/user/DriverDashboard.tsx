'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  TbMapSearch,
  TbMapPin,
  TbArrowRight,
  TbSearch,
} from 'react-icons/tb'

// ✅ Dynamically import the Map (no SSR, avoids window error)
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] flex items-center justify-center text-white">
      Loading map...
    </div>
  ),
})

export default function DriverDashboard() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleSearch = () => {
    if (!from || !to) {
      setSuggestion(null)
      return
    }
    const via = ['EM Bypass', 'VIP Rd', 'AJC Bose Rd', 'Maa Flyover'][
      Math.floor(Math.random() * 4)
    ]
    setSuggestion(`${from} → ${to} via ${via}`)
    setShowPopup(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative font-poppins text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 [background:linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <div className="relative z-10 p-6 sm:p-10 flex flex-col gap-6 items-center">
        {/* Controls */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center shadow-lg"
          >
            <div className="flex items-center gap-2 w-full">
              <TbMapPin className="text-white/80" size={20} />
              <input
                type="text"
                placeholder="Current location"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-transparent border-b border-white/30 text-white placeholder-white/50 outline-none w-full py-1"
              />
            </div>
            <TbArrowRight className="text-white/50 hidden sm:block" size={20} />
            <div className="flex items-center gap-2 w-full">
              <TbMapSearch className="text-white/80" size={20} />
              <input
                type="text"
                placeholder="Destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-transparent border-b border-white/30 text-white placeholder-white/50 outline-none w-full py-1"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSearch}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-400 hover:to-green-400 text-white font-medium flex items-center justify-center gap-2 shadow-md"
            >
              <TbSearch /> Search
            </motion.button>
          </motion.div>
        </div>

        {/* Suggestion Box */}
        {suggestion && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-4 shadow-md text-center w-full max-w-3xl"
          >
            <p className="text-white font-semibold text-lg">{suggestion}</p>
          </motion.div>
        )}

        {/* Map */}
        <MapComponent />

        {/* Popup Modal */}
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md text-center shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-2">🚧 Prototype Notice</h2>
              <p className="text-white/80 text-sm mb-4">
                This is a prototype. The original will be made later by our{' '}
                <strong>SYNTAX</strong> team led by <strong>Smalakar</strong>.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium shadow-md"
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
