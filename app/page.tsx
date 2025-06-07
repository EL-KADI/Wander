"use client"

import { useState, useEffect } from "react"
import InteractiveMap from "@/components/interactive-map"
import Navigation from "@/components/navigation"
import AudioManager from "@/components/audio-manager"
import LoadingSpinner from "@/components/loading-spinner"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation />
      <AudioManager />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">Wander</h1>
            <p className="text-lg md:text-xl text-green-600 max-w-2xl mx-auto">
              Explore the virtual forest and discover its diverse regions, plants, and animals in an immersive
              educational experience
            </p>
          </div>
          <InteractiveMap selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
        </div>
      </main>
    </div>
  )
}
