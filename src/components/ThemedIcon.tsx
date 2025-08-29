"use client"

import Image from 'next/image'
import { useCurrentTheme } from '@/hooks/useTheme'
import { useState, useEffect } from 'react'

interface ThemedIconProps {
  name: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ThemedIcon({ name, alt, width = 20, height = 20, className }: ThemedIconProps) {
  const theme = useCurrentTheme()
  const [useFallback, setUseFallback] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders after hydration to avoid SSR/client mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Determine icon path based on theme and fallback state
  const getIconPath = () => {
    if (useFallback) {
      return `/logos/${name}.svg`
    }
    
    // Handle special naming inconsistencies
    const nameMapping: Record<string, { light: string; dark: string }> = {
      'postgress': { light: 'postgress', dark: 'postgresql-dark' }
    }
    
    if (nameMapping[name]) {
      return theme === 'dark' 
        ? `/logos/${nameMapping[name].dark}.svg`
        : `/logos/${nameMapping[name].light}.svg`
    }
    
    // Use dark icons for dark theme, light icons for light theme
    if (theme === 'dark') {
      return `/logos/${name}-dark.svg`
    } else {
      return `/logos/${name}.svg`
    }
  }

  const handleError = () => {
    // If the themed icon fails to load, fallback to the light version
    if (!useFallback) {
      setUseFallback(true)
    }
  }

  // Show a placeholder during SSR and initial hydration to prevent mismatch
  if (!mounted) {
    return (
      <div 
        className={`${className} animate-pulse bg-muted/30 rounded-sm`}
        style={{ width, height }}
        aria-label={alt}
      />
    )
  }

  return (
    <Image
      src={getIconPath()}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  )
} 