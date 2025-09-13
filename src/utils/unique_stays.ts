import { DateRange } from "react-day-picker"

export default function uniqueStays(stays: DateRange[]) {
  const orderedStays = orderedStaysByFrom(stays)

  const uniqueStays: DateRange[] = []

  for (let i = 0; i < orderedStays.length; ) {
    const currentStay = orderedStays[i]
    if (currentStay === undefined) break

    while (currentStay.to) {
      const nextStay = orderedStays[i + 1]
      if (!nextStay?.to || !nextStay.from) break

      if (nextStay.from <= currentStay.to) {
        if (nextStay.to > currentStay.to) currentStay.to = nextStay.to
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
