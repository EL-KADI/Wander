"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Waves, TreePine, Mountain, Flower } from "lucide-react"
import RegionPopup from "./region-popup"

const forestRegions = [
  {
    id: "misty-lake",
    name: "Misty Lake",
    description: "Home to water lilies and herons",
    icon: Waves,
    position: { x: 30, y: 40 },
    color: "text-blue-500",
    species: 6,
    sound: "water",
  },
  {
    id: "ancient-grove",
    name: "Ancient Grove",
    description: "Giant redwoods and spotted owls",
    icon: TreePine,
    position: { x: 70, y: 20 },
    color: "text-green-700",
    species: 6,
    sound: "forest",
  },
  {
    id: "meadow",
    name: "Sunny Meadow",
    description: "Vibrant wildflowers and butterflies",
    icon: Flower,
    position: { x: 50, y: 70 },
    color: "text-yellow-500",
    species: 7,
    sound: "meadow",
  },
  {
    id: "woodland",
    name: "Dense Woodland",
    description: "Mixed forest with diverse wildlife",
    icon: Leaf,
    position: { x: 20, y: 60 },
    color: "text-green-600",
    species: 7,
    sound: "woodland",
  },
  {
    id: "mountain-ridge",
    name: "Mountain Ridge",
    description: "Alpine plants and mountain animals",
    icon: Mountain,
    position: { x: 80, y: 50 },
    color: "text-gray-600",
    species: 6,
    sound: "mountain",
  },
  {
    id: "pine-forest",
    name: "Pine Forest",
    description: "Towering pines and forest creatures",
    icon: TreePine,
    position: { x: 60, y: 30 },
    color: "text-green-800",
    species: 3,
    sound: "forest",
  },
  {
    id: "river-valley",
    name: "River Valley",
    description: "Flowing waters and riparian wildlife",
    icon: Waves,
    position: { x: 40, y: 50 },
    color: "text-blue-600",
    species: 3,
    sound: "water",
  },
]

interface InteractiveMapProps {
  selectedRegion: any
  onRegionSelect: (region: any) => void
}

export default function InteractiveMap({ selectedRegion, onRegionSelect }: InteractiveMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupRegion, setPopupRegion] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const handleRegionClick = (region: any) => {
    setPopupRegion(region)
    setShowPopup(true)
    onRegionSelect(region)
  }

  const closePopup = () => {
    setShowPopup(false)
    setPopupRegion(null)
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-2xl overflow-hidden shadow-2xl">
      <div
        ref={mapRef}
        className="relative w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/30"></div>

        {forestRegions.map((region) => {
          const IconComponent = region.icon
          return (
            <motion.div
              key={region.id}
              className="absolute cursor-pointer"
              style={{
                left: `${region.position.x}%`,
                top: `${region.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setHoveredRegion(region.id)}
              onHoverEnd={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
            >
              <div className={`p-3 bg-white rounded-full shadow-lg border-2 border-white ${region.color}`}>
                <IconComponent size={24} />
              </div>

              <AnimatePresence>
                {hoveredRegion === region.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-1/2 transform  bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10"
                  >
                    <div className="text-sm font-semibold text-gray-800">{region.name}</div>
                    <div className="text-xs text-gray-600">{region.species} species</div>
                    <div className="absolute -top-1 left-1/2 transform  w-2 h-2 bg-white rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {showPopup && popupRegion && <RegionPopup region={popupRegion} onClose={closePopup} />}
      </AnimatePresence>
    </div>
  )
}
