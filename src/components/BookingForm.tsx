import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { BookingData } from "../App"
import { Calendar, Clock, User, Phone, Check, ChevronRight, Sun, Moon, Coffee, CalendarDays, MapPin } from "lucide-react"

interface BookingFormProps {
  bookingData: BookingData
  updateBookingData: (field: keyof BookingData, value: any) => void
  availableSlots: string[]
  errors: string[]
  onSubmit: (e: React.FormEvent) => void
}

const services = [
  { id: "haircut", name: "اصلاح مو", duration: "۴۵ دقیقه" },
  { id: "beard", name: "اصلاح ریش", duration: "۳۰ دقیقه" },
  { id: "facial", name: "مراقبت از پوست", duration: "۶۰ دقیقه" },
  { id: "color", name: "رنگ مو", duration: "۹۰ دقیقه" }
]

// Group time slots by periods
const groupTimeSlots = (slots: string[]) => {
  const morning = slots.filter(slot => {
    const hour = parseInt(slot.split(':')[0])
    return hour >= 9 && hour < 12
  })
  
  const afternoon = slots.filter(slot => {
    const hour = parseInt(slot.split(':')[0])
    return hour >= 12 && hour < 17
  })
  
  const evening = slots.filter(slot => {
    const hour = parseInt(slot.split(':')[0])
    return hour >= 17 && hour <= 18
  })
  
  return { morning, afternoon, evening }
}

// Persian date formatter
const formatPersianDate = (dateString: string) => {
  const date = new Date(dateString)
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
  
  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  
  return `${dayName}، ${day} ${month}`
}

// Generate next 7 days
const generateNextDays = () => {
  const days = []
  const today = new Date()
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    days.push({
      date: dateString,
      label: formatPersianDate(dateString),
      dayNumber: date.getDate(),
      dayName: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'][date.getDay()],
      isToday: i === 1,
      isTomorrow: i === 2
    })
  }
  
  return days
}

export default function BookingForm({ 
  bookingData, 
  updateBookingData, 
  availableSlots, 
  errors,
  onSubmit 
}: BookingFormProps) {
  const today = new Date().toISOString().split('T')[0]
  const currentStep = bookingData.name && bookingData.phone ? 
    (bookingData.services.length > 0 ? 
      (bookingData.date ? 3 : 2) : 1) : 0

  const selectedServices = services.filter(s => bookingData.services.includes(s.id))
  const totalDuration = selectedServices.reduce((acc, s) => {
    const minutes = parseInt(s.duration)
    return acc + minutes
  }, 0)

  const totalPrice = selectedServices.reduce((acc, s) => {
    const prices: { [key: string]: number } = {
      haircut: 150000,
      beard: 100000,
      facial: 200000,
      color: 300000
    }
    return acc + (prices[s.id] || 0)
  }, 0)

  const groupedSlots = groupTimeSlots(availableSlots)
  const nextDays = generateNextDays()
  
  // Simulated booked slots for demonstration
  const bookedSlots = ['10:00', '14:30', '16:00', '17:30']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { step: 1, title: "اطلاعات شخصی", icon: User },
            { step: 2, title: "انتخاب خدمات", icon: Check },
            { step: 3, title: "زمان‌بندی", icon: Calendar },
            { step: 4, title: "تأیید نهایی", icon: Clock }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center ${currentStep >= item.step - 1 ? 'text-yellow-500' : 'text-gray-500'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep >= item.step - 1 
                    ? 'bg-yellow-500 text-gray-900' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium">{item.title}</span>
              </motion.div>
              {index < 3 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: currentStep > index ? "100%" : "0%" }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="h-0.5 bg-yellow-500 mx-2 flex-1"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            رزرو نوبت آنلاین
          </CardTitle>
          <p className="text-gray-400">در ۴ مرحله ساده نوبت خود را رزرو کنید</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8" id="booking">
            
            {/* Step 1: Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-100">اطلاعات شخصی</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => updateBookingData("name", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-gray-100 pr-10 focus:border-yellow-500 transition-all"
                    placeholder="نام و نام خانوادگی"
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => updateBookingData("phone", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-gray-100 pr-10 focus:border-yellow-500 transition-all"
                    placeholder="شماره موبایل"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Step 2: Services Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-100">انتخاب خدمات</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <motion.label
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                      bookingData.services.includes(service.id)
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.services.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateBookingData("services", [...bookingData.services, service.id])
                        } else {
                          updateBookingData(
                            "services",
                            bookingData.services.filter(s => s !== service.id)
                          )
                        }
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-100">{service.name}</p>
                        <p className="text-sm text-gray-400">{service.duration}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        bookingData.services.includes(service.id)
                          ? 'border-yellow-500 bg-yellow-500'
                          : 'border-gray-500'
                      }`}>
                        {bookingData.services.includes(service.id) && (
                          <Check className="w-4 h-4 text-gray-900" />
                        )}
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/30 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">مدت زمان کل:</span>
                    <span className="text-yellow-500 font-semibold">{totalDuration} دقیقه</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-400">مجموع هزینه:</span>
                    <span className="text-yellow-500 font-semibold">
                      {totalPrice.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Step 3: Enhanced Date and Time Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-100">انتخاب زمان</h3>
              </div>
              
              {/* Enhanced Date Selection */}
              <div className="space-y-4">
                <Label className="text-gray-300 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  تاریخ مراجعه
                </Label>
                
                {/* Custom Date Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {nextDays.map((day, index) => (
                    <motion.button
                      key={day.date}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => updateBookingData("date", day.date)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        bookingData.date === day.date
                          ? 'border-yellow-500 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 shadow-lg shadow-yellow-500/25'
                          : 'border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                    >
                      {day.isToday && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-gray-900 text-xs px-2 py-1 rounded-full font-bold">
                          امروز
                        </div>
                      )}
                      {day.isTomorrow && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-gray-100 text-xs px-2 py-1 rounded-full font-bold">
                          فردا
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className={`text-2xl font-bold mb-1 ${
                          bookingData.date === day.date ? 'text-yellow-500' : 'text-gray-100'
                        }`}>
                          {day.dayNumber}
                        </div>
                        <div className={`text-xs font-medium ${
                          bookingData.date === day.date ? 'text-yellow-600' : 'text-gray-400'
                        }`}>
                          {day.dayName}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Selected Date Display */}
                {bookingData.date && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg p-4 border border-blue-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <div>
                          <span className="text-gray-300 text-sm">تاریخ انتخاب شده:</span>
                          <p className="text-blue-500 font-bold text-lg">
                            {formatPersianDate(bookingData.date)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => updateBookingData("date", "")}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        تغییر
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Alternative Date Input (Hidden by default) */}
                <div className="hidden">
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => updateBookingData("date", e.target.value)}
                    min={today}
                    className="bg-gray-700/50 border-gray-600 text-gray-100 focus:border-yellow-500 transition-all"
                  />
                </div>
              </div>

              {/* Time Selection (Unchanged) */}
              {bookingData.date && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ساعت مراجعه
                  </Label>

                  {/* Time Periods */}
                  <div className="space-y-4">
                    {/* Morning */}
                    {groupedSlots.morning.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2 text-yellow-500 font-medium">
                          <Sun className="w-5 h-5" />
                          <span>صبح (۹:۰۰ - ۱۲:۰۰)</span>
                          <span className="text-gray-500 text-sm font-normal">
                            {groupedSlots.morning.length} نوبت خالی
                          </span>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {groupedSlots.morning.map((slot) => {
                            const isBooked = bookedSlots.includes(slot)
                            const isSelected = bookingData.time === slot
                            
                            return (
                              <motion.button
                                key={slot}
                                type="button"
                                disabled={isBooked}
                                whileHover={!isBooked ? { scale: 1.05 } : {}}
                                whileTap={!isBooked ? { scale: 0.95 } : {}}
                                className={`relative py-3 px-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/25'
                                    : isBooked
                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 border border-gray-600 hover:border-yellow-500/50'
                                }`}
                                onClick={() => !isBooked && updateBookingData("time", slot)}
                              >
                                {slot}
                                {isBooked && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-red-500 transform rotate-45"></div>
                                  </div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Afternoon */}
                    {groupedSlots.afternoon.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2 text-yellow-500 font-medium">
                          <Coffee className="w-5 h-5" />
                          <span>بعد از ظهر (۱۲:۰۰ - ۱۷:۰۰)</span>
                          <span className="text-gray-500 text-sm font-normal">
                            {groupedSlots.afternoon.length} نوبت خالی
                          </span>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {groupedSlots.afternoon.map((slot) => {
                            const isBooked = bookedSlots.includes(slot)
                            const isSelected = bookingData.time === slot
                            
                            return (
                              <motion.button
                                key={slot}
                                type="button"
                                disabled={isBooked}
                                whileHover={!isBooked ? { scale: 1.05 } : {}}
                                whileTap={!isBooked ? { scale: 0.95 } : {}}
                                className={`relative py-3 px-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/25'
                                    : isBooked
                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 border border-gray-600 hover:border-yellow-500/50'
                                }`}
                                onClick={() => !isBooked && updateBookingData("time", slot)}
                              >
                                {slot}
                                {isBooked && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-red-500 transform rotate-45"></div>
                                  </div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Evening */}
                    {groupedSlots.evening.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2 text-yellow-500 font-medium">
                          <Moon className="w-5 h-5" />
                          <span>عصر (۱۷:۰۰ - ۱۸:۳۰)</span>
                          <span className="text-gray-500 text-sm font-normal">
                            {groupedSlots.evening.length} نوبت خالی
                          </span>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {groupedSlots.evening.map((slot) => {
                            const isBooked = bookedSlots.includes(slot)
                            const isSelected = bookingData.time === slot
                            
                            return (
                              <motion.button
                                key={slot}
                                type="button"
                                disabled={isBooked}
                                whileHover={!isBooked ? { scale: 1.05 } : {}}
                                whileTap={!isBooked ? { scale: 0.95 } : {}}
                                className={`relative py-3 px-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/25'
                                    : isBooked
                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 border border-gray-600 hover:border-yellow-500/50'
                                }`}
                                onClick={() => !isBooked && updateBookingData("time", slot)}
                              >
                                {slot}
                                {isBooked && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-red-500 transform rotate-45"></div>
                                  </div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Selected Time Display */}
                  {bookingData.time && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">زمان انتخاب شده:</span>
                        <span className="text-green-500 font-bold text-lg">
                          {bookingData.time}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Step 4: Summary */}
            {bookingData.name && bookingData.phone && bookingData.services.length > 0 && bookingData.date && bookingData.time && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/30"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100">خلاصه رزرو</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">نام:</span>
                    <span className="text-gray-100">{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">تلفن:</span>
                    <span className="text-gray-100">{bookingData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">خدمات:</span>
                    <span className="text-gray-100">
                      {selectedServices.map(s => s.name).join('، ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">تاریخ:</span>
                    <span className="text-gray-100">{formatPersianDate(bookingData.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ساعت:</span>
                    <span className="text-gray-100">{bookingData.time}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-yellow-500">مجموع:</span>
                      <span className="text-yellow-500">
                        {totalPrice.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-900/20 border border-red-500 rounded-lg p-4"
              >
                {errors.map((error, index) => (
                  <p key={index} className="text-red-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {error}
                  </p>
                ))}
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700 font-bold py-4 text-lg transition-all duration-300 shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-2"
              >
                تأیید و رزرو نوبت
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}