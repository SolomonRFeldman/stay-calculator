import { Dispatch, SetStateAction, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Stay } from "../components/Stay"

export default function useStays() {
  const stayRanges = localStorage.getItem("stays")
  const [stays, setStaysState] = useState(generateStaysFromStayRanges(stayRanges ? JSON.parse(stayRanges) : [{}]))

  const setStays: Dispatch<SetStateAction<Stay[]>> = (newStays) => {
    setStaysState((prevStays) => {
      const staysToSet = typeof newStays === "function" ? newStays(prevStays) : newStays
      localStorage.setItem("stays", JSON.stringify(getStayRangesFromStays(staysToSet)))

      return staysToSet
    })
  }

  return [stays, setStays] as const
}

const generateStaysFromStayRanges = (stayRanges: { from?: string, to?: string }[]): Stay[] => {
  return stayRanges.map((range) => ({
    id: uuidv4(),
    range: range ? { from: range.from ? new Date(range.from) : undefined, to: range.to ? new Date(range.to) : undefined } : undefined
  }))
}

export const getStayRangesFromStays = (stays: Stay[]) => {
  return stays.map((stay) => stay.range)
}
