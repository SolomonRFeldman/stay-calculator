import { DateRange } from "react-day-picker"
import millisecondsToDays from "./millisecondsToDays"

export default function totalStayDays(stays: DateRange[], date: Date, lookBackDays?: number) {
  const lookBackDate = lookBackDays && getLookBackDate(date, lookBackDays)

  const totalDays = stays.reduce<number>((total, stay) => {
    if (!stay.from || !stay.to) return total
    if (stay.from > date) return total
    if (lookBackDate && stay.to < lookBackDate) return total

    const startDate = lookBackDate && stay.from < lookBackDate ? lookBackDate : stay.from
    const endDate = stay.to > date ? date : stay.to

    return total + millisecondsToDays(endDate.getTime() - startDate.getTime()) + 1
  }, 0)
  return totalDays
}

const getLookBackDate = (date: Date, lookBackDays: number) => {
  const lookBackDate = new Date(date)
  lookBackDate.setDate(lookBackDate.getDate() - lookBackDays + 1)
  return lookBackDate
}
