'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TbMapPin, TbSearch, TbClock, TbRefresh } from 'react-icons/tb'

export default function Topbar({
  onRouteSelect,
}: {
  onRouteSelect: (route: string) => void
}) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [refreshIn, setRefreshIn] = useState(3)

  useEffect(() => {
    const id = setInterval(() => {
      setRefreshIn((t) => (t <= 1 ? 3 : t - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const handleSearch = () => {
    if (!from || !to) return
    onRouteSelect(to.trim())
  }

  return (
    <div className="sticky top-0 z-40 bg-black/30 backdrop-blur-xl border-b border-white/10 px-4 py-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Route Search */}
        <div className="flex items-center gap-3 w-full md:w-[60%]">
          <div className="flex items-center gap-2 flex-1">
            <TbMapPin className="text-white/80" />
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-transparent border-b border-white/20 text-white placeholder-white/50 outline-none w-full py-1"
            />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <TbSearch className="text-white/80" />
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-transparent border-b border-white/20 text-white placeholder-white/50 outline-none w-full py-1"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSearch}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium shadow-md"
          >
            Find Route
          </motion.button>
        </div>

        {/* Timezone + Refresh */}
        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <TbClock /> IST
          </div>
          <div className="flex items-center gap-2">
            <TbRefresh /> Update in {refreshIn}s
          </div>
        </div>
      </div>
    </div>
  )
}
