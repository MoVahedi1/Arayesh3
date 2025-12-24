import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Scissors, Sparkles, Users, Palette } from "lucide-react"

const services = [
  {
    id: "haircut",
    title: "اصلاح مو",
    description: "اصلاح حرفه‌ای با تکنیک‌های مدرن و متناسب با فرم صورت",
    price: "۱۵۰,۰۰۰ تومان",
    icon: Scissors,
    features: ["مشاوره رایگان", "استایل‌های متنوع", "محصولات باکیفیت"]
  },
  {
    id: "beard",
    title: "اصلاح ریش",
    description: "اصلاح دقیق و شیک ریش با ابزارهای حرفه‌ای",
    price: "۱۰۰,۰۰۰ تومان",
    icon: Users,
    features: ["تکنیک‌های خاص", "ماساژ صورت", "تطبیق با فرم صورت"]
  },
  {
    id: "facial",
    title: "مراقبت از پوست",
    description: "درمان‌های تخصصی پوست صورت",
    price: "۲۰۰,۰۰۰ تومان",
    icon: Sparkles,
    features: ["پاکسازی عمیق", "ماسک‌های طبیعی", "ضدعفونی"]
  },
  {
    id: "color",
    title: "رنگ مو",
    description: "رنگ‌های باکیفیت و ماندگار",
    price: "۳۰۰,۰۰۰ تومان",
    icon: Palette,
    features: ["رنگ‌های اروپایی", "تست حساسیت", "مشاوره رنگ"]
  }
]

export default function ServicesGrid() {
  return (
    <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card 
              className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-yellow-500/50 transition-all duration-300 h-full group cursor-pointer"
            >
              <CardHeader className="text-center pb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4"
                >
                  <Icon className="w-8 h-8 text-gray-900" />
                </motion.div>
                <CardTitle className="text-xl text-gray-100 group-hover:text-yellow-500 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400 mb-4">
                  {service.description}
                </CardDescription>
                <ul className="text-sm text-gray-500 mb-4 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-1">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-2xl font-bold text-yellow-500">{service.price}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}