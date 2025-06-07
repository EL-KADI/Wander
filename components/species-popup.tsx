"use client"

import { motion } from "framer-motion"
import { X, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/components/toast"

interface SpeciesPopupProps {
  species: any
  onClose: () => void
}

export default function SpeciesPopup({ species, onClose }: SpeciesPopupProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const toggleFavorite = () => {
    if (isFavorite(species.id)) {
      removeFromFavorites(species.id)
      showToast(`${species.commonName} removed from favorites`, "success")
    } else {
      addToFavorites(species)
      showToast(`${species.commonName} added to favorites`, "success")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={species.image || "/placeholder.svg"}
            alt={species.commonName}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{species.commonName}</h2>
              <p className="text-gray-600 italic text-lg">{species.scientificName}</p>
            </div>
            <Button
              onClick={toggleFavorite}
              variant={isFavorite(species.id) ? "default" : "outline"}
              size="sm"
              className={isFavorite(species.id) ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Habitat</h3>
              <p className="text-gray-600">{species.habitat}</p>
            </div>

            {species.diet && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Diet</h3>
                <p className="text-gray-600">{species.diet}</p>
              </div>
            )}

            {species.description && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{species.description}</p>
              </div>
            )}

            {species.conservationStatus && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Conservation Status</h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    species.conservationStatus === "Least Concern"
                      ? "bg-green-100 text-green-800"
                      : species.conservationStatus === "Near Threatened"
                        ? "bg-yellow-100 text-yellow-800"
                        : species.conservationStatus === "Vulnerable"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {species.conservationStatus}
                </span>
              </div>
            )}
          </div>

          {species.learnMoreUrl && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <a
                href={species.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Learn More
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
