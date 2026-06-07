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
  const [failed, setFailed] = useState(false)
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
    // First failure: fall back to the light (non -dark) version.
    // Second failure: no logo exists at all -> show an initials badge.
    if (!useFallback) {
      setUseFallback(true)
    } else {
      setFailed(true)
    }
  }

  // Derive clean initials for the fallback badge (e.g. "gns3" -> "GN", "eve-ng" -> "EN")
  const words = name.replace(/[-_]/g, ' ').split(' ').filter(Boolean)
  const initials = (
    words.length === 1
      ? words[0].slice(0, 2)
      : words.slice(0, 2).map((w) => w[0]).join('')
  ).toUpperCase()

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

  // No logo asset available: render a clean initials badge instead of a broken image.
  if (failed) {
    return (
      <span
        className={`${className} inline-flex items-center justify-center rounded-sm font-bold text-primary`}
        style={{ width, height, fontSize: Math.max(9, Math.round(height * 0.5)) }}
        aria-label={alt}
        title={alt}
      >
        {initials}
      </span>
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