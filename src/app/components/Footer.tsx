import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-auto w-full overflow-hidden">
      {/* Footer Content */}
      <div className="relative z-10 px-6 py-8 min-h-[120px] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full text-center">
          {/* First Row: Copyright */}
          <div className="mb-4">
            <p className="text-white text-sm font-medium">
              Dav/Devs Faith © Davina Leong, {currentYear}
            </p>
          </div>

          {/* Second Row: Legal Links */}
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/terms-and-conditions"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
            >
              Terms & Conditions
            </Link>
            <span className="text-white/70">|</span>
            <Link
              href="/privacy-policy"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
