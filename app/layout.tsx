import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import VisitorTracker from "@/components/visitor-tracker"
import { ThemeProvider } from "@/components/theme-provider"
import { LangProvider } from "@/lib/lang-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "O'zbekiston Respublikasi Yoshlar Parlamenti",
  description:
    "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rasmiy veb-sayti",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="yp_theme">
          <LangProvider>
            <VisitorTracker />
            <Header />
            {children}
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
