"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only render after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("system")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      default: // system
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light theme - click for dark"
      case "dark":
        return "Dark theme - click for system"
      default: // system
        return "System theme - click for light"
    }
  }

  // Show a placeholder during SSR/hydration
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={cycleTheme}
      title={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}