'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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
  Satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
}

const bounds = {
  minLat: 22.52,
  maxLat: 22.62,
  minLng: 88.3,
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

interface MapComponentProps {
  selectedRoute: string | null;
}

export default function MapComponent({ selectedRoute }: MapComponentProps) {
  const [theme, setTheme] = useState<string>('Light')
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 'Bus A',
      lat: 22.5726,
      lng: 88.3639,
      route: 'Salt Lake → Airport',
      emoji: '🚍',
      vx: 0.0005,
      vy: 0.00032,
    },
    {
      id: 'Bus B',
      lat: 22.585,
      lng: 88.3705,
      route: 'Howrah → New Town',
      emoji: '🚌',
      vx: -0.00042,
      vy: 0.00028,
    },
    {
      id: 'Bus C',
      lat: 22.56,
      lng: 88.395,
      route: 'Esplanade → Sector V',
      emoji: '🚐',
      vx: 0.00025,
      vy: -0.00035,
    },
  ])

  const userLocation = useMemo(() => ({ lat: 22.57, lng: 88.37 }), [])

  useEffect(() => {
    const stored = localStorage.getItem('mapTheme')
    if (stored && mapThemes[stored]) setTheme(stored)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) => prev.map(stepBus))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-6xl h-[520px] rounded-2xl overflow-hidden border border-white/20 shadow-lg">
      <MapContainer
        center={[22.5726, 88.3639]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          url={mapThemes[theme]}
          attribution="© OpenStreetMap contributors"
        />

        {buses
          .filter(bus => !selectedRoute || bus.route === selectedRoute)
          .map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.lat, bus.lng]}
            icon={emojiIcon(bus.emoji)}
          >
            <Popup>
              <div className="text-sm">
                <strong>{bus.id}</strong>
                <br />
                Route: {bus.route}
              </div>
            </Popup>
          </Marker>
        ))}

        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={emojiIcon('📍', 26)}
        >
          <Popup>
            <div className="text-sm">You are here</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
