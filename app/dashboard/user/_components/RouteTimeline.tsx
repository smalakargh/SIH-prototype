'use client'

import React from 'react'

const busRoutes: Record<string, string[]> = {
  '5A': ['Ultadanga', 'Karunamoyee', 'City Centre'],
  '12C': ['Howrah', 'Esplanade', 'Park Street'],
  '47B': ['Lake Town', 'Shyambazar', 'Ultadanga'],
}

export default function RouteTimeline({ busId }: { busId: string }) {
  const stops = busRoutes[busId] || []

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <h3 className="text-lg font-semibold mb-3 text-white">Bus {busId} Timeline</h3>
      <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
        {stops.map((stop, idx) => (
          <li key={idx}>{stop}</li>
        ))}
      </ul>
    </div>
  )
}
