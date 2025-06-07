"use client"

import { useState, useEffect } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("wander-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const addToFavorites = (item: any) => {
    const newFavorites = [...favorites, { ...item, dateAdded: new Date().toISOString() }]
    setFavorites(newFavorites)
    localStorage.setItem("wander-favorites", JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (id: string) => {
    const newFavorites = favorites.filter((item) => item.id !== id)
    setFavorites(newFavorites)
    localStorage.setItem("wander-favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }
}
