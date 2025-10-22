"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUp } from "lucide-react"
import logo from "./../assets/images/logo-coloured.svg"

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="relative min-h-[120px] w-full overflow-hidden">
      {/* Header Content */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 h-full min-h-[120px]">
        {/* Left: Back to Portal */}
        <div className="flex-1">
          <Link
            href="https://davinaleong.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-white bg-transparent hover:bg-white/10 px-3 py-2 rounded-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dav/Devs Portal
          </Link>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Dav/Devs Faith Logo"
              width={150}
              height={60}
              className="h-12 w-auto hover:scale-105 transition-transform duration-200"
              priority
            />
          </Link>
        </div>

        {/* Right: Back to Top */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center text-sm font-medium text-white bg-transparent hover:bg-white/10 px-3 py-2 rounded-sm transition-colors duration-200"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </button>
        </div>
      </div>
    </header>
  )
}
