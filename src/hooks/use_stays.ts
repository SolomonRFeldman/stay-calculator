import { Dispatch, SetStateAction, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Stay } from "../components/Stay"

interface StayRange {
  from?: string
  to?: string
}

export default function useStays() {
  const localStayRanges = localStorage.getItem("stays") ? localStorage.getItem("stays") : null
  const stayRanges: unknown = localStayRanges ? JSON.parse(localStayRanges) : null
  const [stays, setStaysState] = useState(generateStaysFromStayRanges(isStayRanges(stayRanges) ? stayRanges : [null]))

  const setStays: Dispatch<SetStateAction<Stay[]>> = (newStays) => {
    setStaysState((prevStays) => {
      const staysToSet = typeof newStays === "function" ? newStays(prevStays) : newStays
      localStorage.setItem("stays", JSON.stringify(getStayRangesFromStays(staysToSet)))

      return staysToSet
    })
  }

  return [stays, setStays] as const
}

export const generateStaysFromStayRanges = (stayRanges: (StayRange | null)[]): Stay[] => {
  return stayRanges.map((range) => ({
    id: uuidv4(),
    range: range
      ? { from: range.from ? new Date(range.from) : undefined, to: range.to ? new Date(range.to) : undefined }
      : undefined
  }))
}

export const getStayRangesFromStays = (stays: Stay[]) => {
  return stays.map((stay) => stay.range)
}

export const isStayRanges = (stayRanges: unknown): stayRanges is StayRange[] => {
  if (!Array.isArray(stayRanges)) return false

  return stayRanges.every((range: unknown) => {
    if (range === null) return true
    if (typeof range !== "object") return false
    if (!("from" in range) || !("to" in range)) return false

    const fromValid = range.from === undefined || typeof range.from === "string"
    const toValid = range.to === undefined || typeof range.to === "string"
    return fromValid && toValid
  })
}
