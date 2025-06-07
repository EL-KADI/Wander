"use client"

import { useState, useEffect, useRef } from "react"

const ambientSounds = {
  forest: "/placeholder.svg?height=1&width=1&text=forest-sound.mp3",
  water: "/placeholder.svg?height=1&width=1&text=water-sound.mp3",
  meadow: "/placeholder.svg?height=1&width=1&text=meadow-sound.mp3",
  woodland: "/placeholder.svg?height=1&width=1&text=woodland-sound.mp3",
  mountain: "/placeholder.svg?height=1&width=1&text=mountain-sound.mp3",
}

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false)
  const [currentSound, setCurrentSound] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const savedMuteState = localStorage.getItem("wander-audio-muted")
    if (savedMuteState) {
      setIsMuted(JSON.parse(savedMuteState))
    }
  }, [])

  const toggleMute = () => {
    const newMuteState = !isMuted
    setIsMuted(newMuteState)
    localStorage.setItem("wander-audio-muted", JSON.stringify(newMuteState))

    if (audioRef.current) {
      audioRef.current.muted = newMuteState
    }
  }

  const playAmbientSound = (soundType: keyof typeof ambientSounds) => {
    if (isMuted || currentSound === soundType) return

    stopAmbientSound()

    try {
      const audio = new Audio()
      audio.loop = true
      audio.volume = 0.3
      audio.muted = isMuted
      audioRef.current = audio
      setCurrentSound(soundType)

      audio.play().catch(() => {
        console.log("Audio playback failed")
      })
    } catch (error) {
      console.log("Audio not supported")
    }
  }

  const stopAmbientSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setCurrentSound(null)
  }

  return {
    isMuted,
    toggleMute,
    playAmbientSound,
    stopAmbientSound,
    currentSound,
  }
}
