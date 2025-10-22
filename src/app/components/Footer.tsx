import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-auto w-full overflow-hidden">
      {/* Footer Content */}
      <div className="relative z-10 px-6 py-8 min-h-[120px] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white text-sm font-medium">
                © {currentYear} Dav/Devs Faith. All rights reserved.
              </p>
              <p className="text-white/80 text-xs mt-1">
                Created with ❤️ by{" "}
                <Link
                  href="https://tools.davinaleong.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 underline"
                >
                  Davina Leong
                </Link>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link
                href="/terms-and-conditions"
                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Branding Reference */}
          <div className="border-t border-white/20 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-white/70">
              <span>Powered by faith, built with Next.js</span>
              <span className="hidden sm:inline">•</span>
              <Link
                href="https://tools.davinaleong.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/90 transition-colors duration-200"
              >
                Visit Dav/Devs Portal for more projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
