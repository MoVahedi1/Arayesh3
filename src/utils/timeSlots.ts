export function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

export function getAvailableSlots(allSlots: string[], date: string): string[] {
  // Simulated booked slots for demonstration
  const bookedSlots: { [key: string]: string[] } = {
    "2024-01-15": ["10:00", "14:30", "16:00"],
    "2024-01-16": ["11:00", "15:00"],
    "2024-01-17": ["09:30", "13:00", "17:30"]
  }

  const today = new Date().toISOString().split('T')[0]
  
  // If no specific bookings for this date, return all slots
  if (!bookedSlots[date] && date !== today) {
    return allSlots
  }

  // Filter out booked slots
  const booked = bookedSlots[date] || []
  
  // If it's today, filter out past times
  if (date === today) {
    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    
    return allSlots.filter(slot => {
      const isPast = slot < currentTime
      const isBooked = booked.includes(slot)
      return !isPast && !isBooked
    })
  }

  return allSlots.filter(slot => !booked.includes(slot))
}