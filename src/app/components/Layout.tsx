import Image from "next/image"
import Header from "./Header"
import Footer from "./Footer"
import bgHeaderMobile from "./../assets/images/bg-h-m.svg"
import bgHeaderDesktop from "./../assets/images/bg-h-d.svg"
import bgFooterMobile from "./../assets/images/bg-f-m.svg"
import bgFooterDesktop from "./../assets/images/bg-f-d.svg"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Header Background Images - Top */}
      <div className="absolute top-0 left-0 right-0 z-0 h-[600px] w-full">
        {/* Mobile/Vertical Background */}
        <div className="block md:hidden h-full w-full">
          <Image
            src={bgHeaderMobile}
            alt="Header background mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Desktop/Horizontal Background */}
        <div className="hidden md:block h-full w-full">
          <Image
            src={bgHeaderDesktop}
            alt="Header background desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Footer Background Images - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-[300px] w-full">
        {/* Mobile/Vertical Background */}
        <div className="block md:hidden h-full w-full">
          <Image
            src={bgFooterMobile}
            alt="Footer background mobile"
            fill
            className="object-cover object-center"
          />
        </div>
        {/* Desktop/Horizontal Background */}
        <div className="hidden md:block h-full w-full">
          <Image
            src={bgFooterDesktop}
            alt="Footer background desktop"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
