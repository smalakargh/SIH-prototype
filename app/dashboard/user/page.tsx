'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import {
  TbMapSearch,
  TbMapPin,
  TbArrowRight,
  TbSearch
} from 'react-icons/tb'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Bus = {
  id: string
  lat: number
  lng: number
  route: string
  emoji: string
  vx: number
  vy: number
}

const emojiIcon = (emoji: string, fontSize = 24) =>
  new L.DivIcon({
    html: `<div style="font-size:${fontSize}px; line-height:1;">${emoji}</div>`,
    className: '',
    iconSize: [fontSize, fontSize],
    iconAnchor: [fontSize / 2, fontSize / 2],
  })

const mapThemes: Record<string, string> = {
  Light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Dark: 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png',
  Satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
}

const bounds = {
  minLat: 22.52,
  maxLat: 22.62,
  minLng: 88.30,
  maxLng: 88.42,
}

function stepBus(b: Bus): Bus {
  let { lat, lng, vx, vy } = b
  lat += vx
  lng += vy

  if (lat < bounds.minLat || lat > bounds.maxLat) vx *= -1
  if (lng < bounds.minLng || lng > bounds.maxLng) vy *= -1

  vx += (Math.random() - 0.5) * 0.00001
  vy += (Math.random() - 0.5) * 0.00001

  const maxSpeed = 0.0009
  vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx))
  vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy))

  return { ...b, lat, lng, vx, vy }
}

export default function DriverDashboard() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [theme, setTheme] = useState<string>('Light')
  const [showPopup, setShowPopup] = useState(false)

  const userLocation = useMemo(() => ({ lat: 22.57, lng: 88.37 }), [])

  const [buses, setBuses] = useState<Bus[]>([
    { id: 'Bus A', lat: 22.5726, lng: 88.3639, route: 'Salt Lake → Airport', emoji: '🚍', vx: 0.0005, vy: 0.00032 },
    { id: 'Bus B', lat: 22.585, lng: 88.3705, route: 'Howrah → New Town', emoji: '🚌', vx: -0.00042, vy: 0.00028 },
    { id: 'Bus C', lat: 22.560, lng: 88.395, route: 'Esplanade → Sector V', emoji: '🚐', vx: 0.00025, vy: -0.00035 },
  ])

  useEffect(() => {
    const stored = localStorage.getItem('mapTheme')
    if (stored && mapThemes[stored]) setTheme(stored)
  }, [])

  const handleThemeChange = (t: string) => {
    setTheme(t)
    localStorage.setItem('mapTheme', t)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(stepBus))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    if (!from || !to) {
      setSuggestion(null)
      return
    }
    const via = ['EM Bypass', 'VIP Rd', 'AJC Bose Rd', 'Maa Flyover'][Math.floor(Math.random() * 4)]
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

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-md flex gap-3 items-center self-stretch"
          >
            <span className="text-white/80 text-sm">Map theme</span>
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="bg-transparent border border-white/30 text-white text-sm px-3 py-1 rounded-lg outline-none"
            >
              {Object.keys(mapThemes).map((key) => (
                <option key={key} value={key} className="text-black">
                  {key}
                </option>
              ))}
            </select>
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

        {/* Leaflet Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-6xl h-[520px] rounded-2xl overflow-hidden border border-white/20 shadow-lg"
        >
          <MapContainer
            center={[22.5726, 88.3639]}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full z-0"
          >
            <TileLayer url={mapThemes[theme]} attribution="© OpenStreetMap contributors" />

            {/* Live-moving buses */}
            {buses.map((bus) => (
              <Marker
                key={bus.id}
                position={[bus.lat, bus.lng]}
                icon={emojiIcon(bus.emoji)}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{bus.id}</strong><br />
                    Route: {bus.route}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Static user location */}
            <Marker position={[userLocation.lat, userLocation.lng]} icon={emojiIcon('📍', 26)}>
              <Popup>
                <div className="text-sm">You are here</div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>

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
