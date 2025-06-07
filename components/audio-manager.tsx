"use client"

import { useEffect } from "react"
import { useAudio } from "@/hooks/use-audio"

export default function AudioManager() {
  const { playAmbientSound, stopAmbientSound } = useAudio()

  useEffect(() => {
    playAmbientSound("forest")

    return () => {
      stopAmbientSound()
    }
  }, [])

  return null
}
