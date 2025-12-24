import { BookingData } from "../App"

export function validateBookingForm(data: BookingData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name.trim()) {
    errors.push("نام الزامی است")
  }

  if (!data.phone.trim()) {
    errors.push("شماره تلفن الزامی است")
  } else if (!/^09\d{9}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.push("شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود")
  }

  if (data.services.length === 0) {
    errors.push("حداقل یک خدمت باید انتخاب شود")
  }

  if (!data.date) {
    errors.push("تاریخ الزامی است")
  }

  if (!data.time) {
    errors.push("ساعت الزامی است")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}