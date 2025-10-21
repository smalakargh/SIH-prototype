'use client'

import React, { useState } from 'react'
import { TbBus } from 'react-icons/tb'
import { motion } from 'framer-motion'

export default function SeatPoll({ route }: { route: string }) {
  const [vote, setVote] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <TbBus /> Seat Occupancy Poll
      </h3>
      <p className="text-white/80 text-sm mb-4">
        How full was your bus to <strong>{route}</strong>?
      </p>
      <div className="flex flex-wrap gap-3">
        {['Empty', 'Moderate', 'Crowded'].map((label) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setVote(label)}
            className={`px-4 py-2 rounded-xl text-white font-medium shadow-md transition ${
              vote === label
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
          >
            {label}
          </motion.button>
        ))}
      </div>
      {vote && (
        <p className="text-xs text-white/70 mt-3">
          You voted: <strong>{vote}</strong>. Thanks for helping others!
        </p>
      )}
    </motion.div>
  )
}
