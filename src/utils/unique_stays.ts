import { DateRange } from "react-day-picker"

export default function uniqueStays(stays: DateRange[]) {
  const orderedStays = orderedStaysByFrom(stays)

  const uniqueStays: DateRange[] = []

  for (let i = 0; i < orderedStays.length;) {
    const currentStay = orderedStays[i]

    while (currentStay?.to) {
      const nextStay = orderedStays[i + 1]

      if (nextStay?.to && nextStay?.from && nextStay.from <= currentStay.to) {
        if (nextStay.to > currentStay.to) currentStay.to = orderedStays[i + 1].to
      } else {
        break
      }

      i++
    }

    uniqueStays.push(currentStay)

    i++
  }

  return uniqueStays
}

const orderedStaysByFrom = (stays: DateRange[]) => {
  return stays.sort((a, b) => {
    if (a.from && b.from) {
      return a.from.getTime() - b.from.getTime()
    }
    return 0
  })
}
