"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Writes the user's *explicit* theme choice (light | dark | system) to
 * `document.documentElement.dataset.mode`. This lets CSS distinguish an
 * explicit "light"/"dark" pick (which get the starry / hacker looks) from
 * "system" (which keeps the default teal palette) — something the plain
 * next-themes class can't express on its own.
 */
export function ThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.mode = theme || "system";
  }, [theme]);

  return null;
}
