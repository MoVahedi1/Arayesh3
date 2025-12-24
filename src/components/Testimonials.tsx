import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"

const testimonials = [
  {
    name: "علی رضایی",
    text: "تجربه فوق‌العاده‌ای بود. حرفه‌ای و با دقت بالا. مطمئناً دوباره مراجعه خواهم کرد.",
    rating: 5,
    service: "برش مردانه"
  },
  {
    name: "محمد حسینی",
    text: "بهترین آرایشگاهی که تا حالا رفتم. محیط بسیار شیک و پرسنل حرفه‌ای.",
    rating: 5,
    service: "اصلاح ریش"
  },
  {
    name: "امیر اکبری",
    text: "کیفیت خدمات بی‌نظیر است. قیمت‌ها هم کاملاً منصفانه. پیشنهاد می‌کنم.",
    rating: 5,
    service: "رنگ مو"
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            نظرات مشتریان
          </h2>
          <p className="text-xl text-gray-400">رضایت شما اولویت ماست</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-yellow-500/50 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-yellow-500/50" />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-yellow-500">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.service}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}