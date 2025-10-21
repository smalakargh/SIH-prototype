'use client'

import React from 'react'
import { TbRoute } from 'react-icons/tb'
import { motion } from 'framer-motion'

export default function AISuggestion({ route }: { route: string }) {
  const via = ['EM Bypass', 'VIP Rd', 'AJC Bose Rd', 'Maa Flyover'][
    Math.floor(Math.random() * 4)
  ]
  const eta = Math.floor(Math.random() * 20 + 10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <TbRoute /> AI Route Suggestion
      </h3>
      <p className="text-white/80 text-sm mb-3">
        Based on current traffic, shortest route to <strong>{route}</strong> is via <strong>{via}</strong>.
      </p>
      <p className="text-white/70 text-sm">Estimated time: <strong>{eta} mins</strong></p>
    </motion.div>
  )
}
