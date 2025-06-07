"use client"

import { motion } from "framer-motion"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RegionPopupProps {
  region: any
  onClose: () => void
}

export default function RegionPopup({ region, onClose }: RegionPopupProps) {
  const IconComponent = region.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${region.color} bg-gray-100`}>
              <IconComponent size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{region.name}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </Button>
        </div>

        <p className="text-gray-600 mb-4">{region.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span>{region.species} species recorded</span>
          <span className="capitalize">{region.sound} sounds</span>
        </div>

        <Link href={`/region/${region.id}`}>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Explore Region
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
