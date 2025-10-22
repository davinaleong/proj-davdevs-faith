"use client"

import Link from "next/link"
import { Home } from "lucide-react"

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      <Home className="w-4 h-4 mr-2" />
      Back to Home
    </Link>
  )
}
