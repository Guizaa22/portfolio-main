"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Removed specific type import: import { type ThemeProviderProps } from "next-themes/dist/types"

// Let TypeScript infer props from the imported provider
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}