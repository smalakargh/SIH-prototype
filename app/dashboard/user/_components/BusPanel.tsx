'use client'

import React from 'react'

const demoBuses = [
  { id: '5A', route: 'Salt Lake', lastSeen: '11:15 AM', stops: ['Ultadanga', 'Karunamoyee', 'City Centre'] },
  { id: '12C', route: 'Park St', lastSeen: '11:10 AM', stops: ['Howrah', 'Esplanade', 'Park Street'] },
  { id: '47B', route: 'Ultadanga', lastSeen: '11:05 AM', stops: ['Lake Town', 'Shyambazar', 'Ultadanga'] },
]

export default function BusPanel({
  selectedRoute,
  onBusSelect,
}: {
  selectedRoute: string | null
  onBusSelect: (busId: string) => void
}) {
  const filtered = selectedRoute
    ? demoBuses.filter((b) => b.route === selectedRoute)
    : demoBuses

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3 text-white/90">Available Buses</h3>
      <div className="space-y-2">
        {filtered.map((bus) => (
          <button
            key={bus.id}
            onClick={() => onBusSelect(bus.id)}
            className="w-full text-left bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition"
          >
            <div className="font-medium text-white">Bus {bus.id}</div>
            <div className="text-xs text-white/60">Route: {bus.route} • Last seen: {bus.lastSeen}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
