import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dav/Devs Faith",
  description:
    "A faith-based platform exploring the intersection of technology and spirituality, created by Davina Leong (Dav/Devs).",
  keywords: [
    "faith",
    "technology",
    "spirituality",
    "development",
    "christian",
    "developer",
  ],
  authors: [{ name: "Davina", url: "https://github.com/davinaleong" }],
  creator: "Davina Leong",
  publisher: "Dav/Devs",
  robots: "index, follow",
  openGraph: {
    title: "Dav/Devs Faith",
    description:
      "A faith-based platform exploring the intersection of technology and spirituality",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dav/Devs Faith",
    description:
      "A faith-based platform exploring the intersection of technology and spirituality",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
