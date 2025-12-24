import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./components/Header"
import ServicesGrid from "./components/ServicesGrid"
import BookingForm from "./components/BookingForm"
import SuccessModal from "./components/SuccessModal"
import HeroSection from "./components/HeroSection"
import Testimonials from "./components/Testimonials"
import ContactSection from "./components/ContactSection"
import { generateTimeSlots, getAvailableSlots } from "./utils/timeSlots"
import { validateBookingForm } from "./utils/validateForm"

export interface BookingData {
  name: string
  phone: string
  services: string[]
  date: string
  time: string
}

export default function App() {
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    phone: "",
    services: [],
    date: "",
    time: ""
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (bookingData.date) {
      const slots = generateTimeSlots()
      const available = getAvailableSlots(slots, bookingData.date)
      setAvailableSlots(available)
    } else {
      setAvailableSlots([])
    }
  }, [bookingData.date])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateBookingForm(bookingData)
    
    if (validation.isValid) {
      setShowSuccess(true)
      setErrors([])
      setTimeout(() => {
        setBookingData({
          name: "",
          phone: "",
          services: [],
          date: "",
          time: ""
        })
        setShowSuccess(false)
      }, 3000)
    } else {
      setErrors(validation.errors)
    }
  }

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    setErrors([])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <Header />
      
      <main>
        <HeroSection />
        
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 py-16 max-w-6xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              خدمات ما
            </h2>
            <p className="text-xl text-gray-400">با بهترین کیفیت و تخصص</p>
          </div>
          <ServicesGrid />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-b from-gray-900 to-gray-800"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                رزرو نوبت آنلاین
              </h2>
              <p className="text-xl text-gray-400">به سادگی و در چند دقیقه</p>
            </div>
            <BookingForm
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              availableSlots={availableSlots}
              errors={errors}
              onSubmit={handleSubmit}
            />
          </div>
        </motion.section>

        <Testimonials />
        <ContactSection />
      </main>

      <AnimatePresence>
        {showSuccess && <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>

      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 GROOM. تمام حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  )
}