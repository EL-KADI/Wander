"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Heart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SpeciesPopup from "@/components/species-popup"
import DataVisualization from "@/components/data-visualization"
import { useAudio } from "@/hooks/use-audio"
import { useFavorites } from "@/hooks/use-favorites"
import { useSpeciesData } from "@/hooks/use-species-data"
import LoadingSpinner from "@/components/loading-spinner"
import { useToast } from "@/components/toast"

const regionData = {
  "misty-lake": {
    name: "Misty Lake",
    description:
      "A serene lake surrounded by misty shores, home to aquatic plants and water birds. This pristine freshwater ecosystem supports a diverse community of species adapted to life in and around water.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
    sound: "water",
    ecosystem: "Freshwater Aquatic",
  },
  "ancient-grove": {
    name: "Ancient Grove",
    description:
      "Towering ancient trees create a cathedral-like canopy in this old-growth forest. These magnificent giants have stood for centuries, providing habitat for countless species in their complex ecosystem.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&auto=format",
    sound: "forest",
    ecosystem: "Old-Growth Forest",
  },
  meadow: {
    name: "Sunny Meadow",
    description:
      "A vibrant meadow filled with wildflowers and buzzing with insect life. This open grassland ecosystem bursts with color during blooming season and supports numerous pollinators and herbivores.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop&auto=format",
    sound: "meadow",
    ecosystem: "Temperate Grassland",
  },
  woodland: {
    name: "Dense Woodland",
    description:
      "A mixed deciduous forest with diverse plant and animal communities. This dynamic ecosystem changes dramatically with the seasons, supporting species adapted to both canopy and forest floor environments.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
    sound: "woodland",
    ecosystem: "Mixed Deciduous Forest",
  },
  "mountain-ridge": {
    name: "Mountain Ridge",
    description:
      "High-altitude environment with specialized alpine flora and fauna. This harsh but beautiful ecosystem is home to species uniquely adapted to extreme weather conditions and rocky terrain.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
    sound: "mountain",
    ecosystem: "Alpine Tundra",
  },
  "pine-forest": {
    name: "Pine Forest",
    description:
      "Dense coniferous forest dominated by towering pine trees. This evergreen ecosystem provides year-round shelter and food sources for species adapted to needle-bearing trees and acidic soil conditions.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&auto=format",
    sound: "forest",
    ecosystem: "Boreal Coniferous Forest",
  },
  "river-valley": {
    name: "River Valley",
    description:
      "Lush valley carved by a meandering river, supporting diverse riparian life. This water-rich environment creates a unique corridor ecosystem that connects different habitats and supports both aquatic and terrestrial species.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
    sound: "water",
    ecosystem: "Riparian Corridor",
  },
}

export default function RegionPage() {
  const params = useParams()
  const router = useRouter()
  const regionId = params.id as string
  const region = regionData[regionId as keyof typeof regionData]

  const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState(0)
  const [selectedSpecies, setSelectedSpecies] = useState<any>(null)
  const [showSpeciesPopup, setShowSpeciesPopup] = useState(false)

  const { playAmbientSound } = useAudio()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { species, loading, error } = useSpeciesData(regionId)
  const { showToast } = useToast()

  useEffect(() => {
    if (region) {
      playAmbientSound(region.sound as any)
    }
  }, [region, playAmbientSound])

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Region Not Found</h1>
          <p className="text-gray-600 mb-6">The requested forest region could not be found.</p>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Return to Forest Map
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const handleSpeciesClick = (speciesItem: any) => {
    setSelectedSpecies(speciesItem)
    setShowSpeciesPopup(true)
  }

  const nextSpecies = () => {
    setCurrentSpeciesIndex((prev) => (prev + 1) % species.length)
  }

  const prevSpecies = () => {
    setCurrentSpeciesIndex((prev) => (prev - 1 + species.length) % species.length)
  }

  const toggleFavoriteRegion = () => {
    const regionFavorite = {
      id: regionId,
      name: region.name,
      type: "region",
      image: region.image,
    }

    if (isFavorite(regionId)) {
      removeFromFavorites(regionId)
      showToast(`${region.name} removed from favorites`, "success")
    } else {
      addToFavorites(regionFavorite)
      showToast(`${region.name} added to favorites`, "success")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={() => router.push("/")} variant="outline" className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Forest Map
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">{region.name}</h1>
            <Button
              onClick={toggleFavoriteRegion}
              variant={isFavorite(regionId) ? "default" : "outline"}
              className={isFavorite(regionId) ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart size={16} className="mr-2" />
              {isFavorite(regionId) ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <img
              src={
                region.image ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&auto=format" ||
                "/placeholder.svg"
              }
              alt={region.name}
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <div className="mt-4">
              <p className="text-gray-600 text-lg leading-relaxed">{region.description}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>Ecosystem Type: {region.ecosystem}</span>
                <span>•</span>
                <span>{species.length} species documented</span>
              </div>
            </div>
          </div>

          <DataVisualization species={species} />
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">
              <strong>Notice:</strong> Unable to fetch live data from external sources. Currently displaying offline
              species information for demonstration purposes.
            </p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Featured Species Showcase</h2>

          {species.length > 0 && (
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Button onClick={prevSpecies} variant="outline" size="sm" disabled={species.length <= 1}>
                  <ChevronLeft size={16} />
                  Previous
                </Button>

                <span className="text-sm text-gray-500 font-medium">
                  Species {currentSpeciesIndex + 1} of {species.length}
                </span>

                <Button onClick={nextSpecies} variant="outline" size="sm" disabled={species.length <= 1}>
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpeciesIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleSpeciesClick(species[currentSpeciesIndex])}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            species[currentSpeciesIndex].image ||
                            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&auto=format" ||
                            "/placeholder.svg"
                          }
                          alt={species[currentSpeciesIndex].commonName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {species[currentSpeciesIndex].commonName}
                          </h3>
                          <p className="text-gray-600 italic">{species[currentSpeciesIndex].scientificName}</p>
                          <p className="text-sm text-gray-500 mt-2">{species[currentSpeciesIndex].habitat}</p>
                        </div>
                        <div className="text-center">
                          <ExternalLink size={20} className="text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500">Click to learn more</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-6">All Species in This Region</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((speciesItem, index) => (
              <motion.div
                key={speciesItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleSpeciesClick(speciesItem)}
                >
                  <CardContent className="p-4">
                    <img
                      src={
                        speciesItem.image ||
                        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&auto=format" ||
                        "/placeholder.svg"
                      }
                      alt={speciesItem.commonName}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 mb-1">{speciesItem.commonName}</h3>
                    <p className="text-sm text-gray-600 italic mb-2">{speciesItem.scientificName}</p>
                    <p className="text-xs text-gray-500">{speciesItem.habitat}</p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          speciesItem.type === "Plant"
                            ? "bg-green-100 text-green-800"
                            : speciesItem.type === "Bird"
                              ? "bg-blue-100 text-blue-800"
                              : speciesItem.type === "Mammal"
                                ? "bg-orange-100 text-orange-800"
                                : speciesItem.type === "Insect"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : speciesItem.type === "Reptile"
                                    ? "bg-red-100 text-red-800"
                                    : speciesItem.type === "Fish"
                                      ? "bg-cyan-100 text-cyan-800"
                                      : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {speciesItem.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSpeciesPopup && selectedSpecies && (
          <SpeciesPopup species={selectedSpecies} onClose={() => setShowSpeciesPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
