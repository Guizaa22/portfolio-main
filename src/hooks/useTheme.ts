"use client"

import { useTheme } from "next-themes"

export function useCurrentTheme() {
  const { theme, resolvedTheme } = useTheme()
  return resolvedTheme || theme || 'light'
} 