// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
