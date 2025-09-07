'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TbShieldCheck } from 'react-icons/tb'

export default function DriverOtpVerification() {
  const length = 6
  const [digits, setDigits] = useState<string[]>(Array.from({ length }, () => ''))
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (idx: number, val: string) => {
    setError(null)
    const sanitized = val.replace(/\D/g, '')
    if (!sanitized) return

    const next = [...digits]
    let i = idx
    for (const ch of sanitized.split('')) {
      if (i >= length) break
      next[i] = ch
      i++
    }
    setDigits(next)
    inputsRef.current[Math.min(i, length - 1)]?.focus()
    setFocusedIndex(Math.min(i, length - 1))
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const next = [...digits]
      if (next[idx]) {
        next[idx] = ''
        setDigits(next)
        setFocusedIndex(idx)
      } else if (idx > 0) {
        next[idx - 1] = ''
        setDigits(next)
        setFocusedIndex(idx - 1)
      }
      inputsRef.current[focusedIndex]?.focus()
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
      setFocusedIndex(idx - 1)
    }
    if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus()
      setFocusedIndex(idx + 1)
    }
  }

  const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '')
    const next = [...digits]
    let i = idx
    for (const ch of text) {
      if (i >= length) break
      next[i] = ch
      i++
    }
    setDigits(next)
    inputsRef.current[Math.min(i, length - 1)]?.focus()
    setFocusedIndex(Math.min(i, length - 1))
  }

  const verify = () => {
    const code = digits.join('')
    if (code.length < length || digits.includes('')) {
      setError('Please enter all 6 digits')
      return
    }
    setError(null)
    console.log('Verifying OTP:', code)
    setShowPopup(true)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative font-poppins">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 [background:linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[92%] sm:w-[520px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6 sm:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
            <TbShieldCheck className="text-white" size={22} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Driver Verification</h2>
            <p className="text-white/70 text-sm">Enter the 8-digit code provided by the organization.</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          {digits.map((d, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
              onFocus={() => setFocusedIndex(i)}
              className={`h-12 w-10 sm:h-14 sm:w-12 text-center text-lg sm:text-xl font-semibold rounded-xl bg-white/10 border transition-all outline-none
              ${focusedIndex === i ? 'border-white/60 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]' : 'border-white/20'}
              placeholder:text-white/40`}
              placeholder="•"
              whileFocus={{ scale: 1.04 }}
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>

        {error && <div className="mt-4 text-sm text-red-300">{error}</div>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={verify}
          className="mt-6 w-full py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-400 hover:to-green-400 text-white shadow-md transition-all"
        >
          Verify Code
        </motion.button>

        <p className="mt-4 text-center text-xs text-white/60">
          For your safety, don’t share this code with anyone.
        </p>
      </motion.div>

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
              This is a prototype. The original will be made later by our <strong>SYNTAX</strong> team led by <strong>Smalakar</strong>.
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
  )
}
