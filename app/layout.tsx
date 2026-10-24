import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = { title: "Insight Copilot", description: "Commerce analytics copilot for metric-aware diagnosis." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
