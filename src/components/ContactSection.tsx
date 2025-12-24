import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"

export default function ContactSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            تماس با ما
          </h2>
          <p className="text-xl text-gray-400">همیشه آماده خدمت‌رسانی به شما هستیم</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MapPin,
              title: "آدرس",
              content: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
              delay: 0
            },
            {
              icon: Phone,
              title: "تلفن",
              content: "۰۲۱-۸۸۷۷۶۶۵۵",
              delay: 0.1
            },
            {
              icon: Mail,
              title: "ایمیل",
              content: "info@groom.ir",
              delay: 0.2
            },
            {
              icon: Clock,
              title: "ساعت کاری",
              content: "شنبه تا چهارشنبه ۹-۲۰",
              delay: 0.3
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-yellow-500/50 transition-all duration-300 h-full group">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4"
                  >
                    <item.icon className="w-8 h-8 text-gray-900" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-500">{item.title}</h3>
                  <p className="text-gray-400">{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-1 rounded-2xl">
            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">دنبال ما باشید</h3>
              <p className="text-gray-400 mb-6">از طریق شبکه‌های اجتماعی با ما در ارتباط باشید</p>
              <div className="flex justify-center gap-4">
                {['اینستاگرام', 'تلگرام', 'واتس‌اپ'].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
                  >
                    {social}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}