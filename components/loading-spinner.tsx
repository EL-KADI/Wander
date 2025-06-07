"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-green-800 mb-2">Loading Forest...</h2>
        <p className="text-green-600">Preparing your nature exploration experience</p>
      </div>
    </div>
  )
}
