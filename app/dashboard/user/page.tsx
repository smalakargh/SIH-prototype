'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from './_components/Sidebar'
import Topbar from './_components/Topbar'
import BusPanel from './_components/BusPanel'
import AISuggestion from './_components/AISuggestion'
import SeatPoll from './_components/SeatPoll'
import RouteTimeline from './_components/RouteTimeline'

const MapComponent = dynamic(() => import('./_components/MapComponent'), { ssr: false })

export default function UserDashboard() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [selectedBus, setSelectedBus] = useState<string | null>(null)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar */}
        <aside className="md:col-span-2 sticky top-0 z-50">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-7 px-4 md:px-6 py-4 space-y-6">
          <Topbar
            onRouteSelect={(route) => {
              setSelectedRoute(route)
              setSelectedBus(null)
            }}
          />

          <MapComponent selectedRoute={selectedRoute} />

          {selectedBus && <RouteTimeline busId={selectedBus} />}

          {selectedRoute && (
            <>
              <AISuggestion route={selectedRoute} />
              <SeatPoll route={selectedRoute} />
            </>
          )}
        </main>

        {/* Right Panel */}
        <aside className="md:col-span-3 px-4 py-4 border-l border-white/10 bg-black/30 backdrop-blur-xl">
          <BusPanel
            selectedRoute={selectedRoute}
            onBusSelect={(busId) => setSelectedBus(busId)}
          />
        </aside>
      </div>
    </div>
  )
}
