'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TbMapPin, TbBus, TbUser, TbClock, TbRoute, TbSettings, TbSearch, TbLocation } from 'react-icons/tb'

const features = [
  {
    icon: TbSearch,
    title: 'Smart Route Search',
    description: 'Quickly find the best route from your current location to any destination using our intelligent search bar. NavigateMe suggests optimal paths based on traffic, distance, and clarity.',
  },
  {
    icon: TbRoute,
    title: 'Live Route Suggestions',
    description: 'Get real-time suggestions for the most efficient and safe routes. Our system adapts to changing conditions and offers emotionally supportive guidance for every journey.',
  },
  {
    icon: TbBus,
    title: 'Driver Dashboard',
    description: 'A dedicated dashboard for drivers with live bus tracking, OTP verification, and role-based access. Designed with clarity, motion, and delight in mind.',
  },
  {
    icon: TbMapPin,
    title: 'Interactive Map',
    description: 'Explore a dynamic Leaflet map with emoji-powered bus markers and user location pins. Hover to view bus details and watch them move in real time.',
  },
  {
    icon: TbClock,
    title: 'Schedule Updates',
    description: 'Stay informed with live schedule changes and trip completions. NavigateMe ensures you’re never left guessing.',
  },
  {
    icon: TbUser,
    title: 'User-Friendly Experience',
    description: 'Whether you’re a driver, commuter, or curious explorer, NavigateMe is built to be intuitive, playful, and emotionally engaging for all users.',
  },
  {
    icon: TbSettings,
    title: 'Theme Customization',
    description: 'Switch between Light, Dark, and Satellite map themes. Your preferences are saved locally for a personalized experience every time.',
  },
  {
    icon: TbLocation,
    title: 'Live Location Sharing',
    description: 'Drivers can share their live location securely, enabling real-time tracking and smoother coordination with passengers.',
  },
]

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-poppins relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 [background:linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <div className="relative z-10 px-6 sm:px-12 py-12 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-6 font-caveat"
        >
          Welcome to NavigateMe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-center max-w-3xl mx-auto mb-12 text-lg"
        >
          NavigateMe is your emotionally intelligent travel companion. Whether you're commuting, driving, or exploring, we help you move with clarity, confidence, and joy.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md hover:border-white/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                  <feature.icon className="text-white" size={22} />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: features.length * 0.1 + 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-sm">
            Built with ❤️ by the NavigateMe team. We believe travel should feel safe, smart, and supportive.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
