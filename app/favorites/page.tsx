"use client"

import { motion } from "framer-motion"
import { Heart, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useFavorites } from "@/hooks/use-favorites"
import Link from "next/link"
import { useToast } from "@/components/toast"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()
  const { showToast } = useToast()

  const handleRemove = (id: string, name: string) => {
    removeFromFavorites(id)
    showToast(`${name} removed from favorites`, "success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Your Favorites</h1>
          <p className="text-lg text-green-600">Species and regions you've saved for later</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start exploring regions and species to add them to your favorites</p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">Explore Forest</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.commonName || item.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => handleRemove(item.id, item.commonName || item.name)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-1">{item.commonName || item.name}</h3>

                    {item.scientificName && <p className="text-sm text-gray-600 italic mb-2">{item.scientificName}</p>}

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="capitalize">{item.type || "Region"}</span>
                      <span>{new Date(item.dateAdded).toLocaleDateString()}</span>
                    </div>

                    {item.type === "region" ? (
                      <Link href={`/region/${item.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink size={14} className="mr-2" />
                          Visit Region
                        </Button>
                      </Link>
                    ) : (
                      <div className="text-xs text-gray-500">{item.habitat}</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
