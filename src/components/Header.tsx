import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-yellow-500">GROOM</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium"
            >
              خانه
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium"
            >
              خدمات
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium"
            >
              رزرو
            </button>
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-yellow-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-gray-300 hover:text-yellow-500 transition-colors text-right py-2 font-medium"
              >
                خانه
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="text-gray-300 hover:text-yellow-500 transition-colors text-right py-2 font-medium"
              >
                خدمات
              </button>
              <button 
                onClick={() => scrollToSection("booking")}
                className="text-gray-300 hover:text-yellow-500 transition-colors text-right py-2 font-medium"
              >
                رزرو
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}