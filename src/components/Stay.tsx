import { DateRange } from "react-day-picker"
import millisecondsToDays from "../utils/millisecondsToDays"
import { XMarkIcon } from "@heroicons/react/24/solid"

export interface Stay {
  id: string
  range?: DateRange
}

interface StayProps {
  stay: Stay
  editStay: () => void
  deleteStay: () => void
  stayDaysInPeriod?: number
}

export default function Stay({ stay: { range }, editStay, deleteStay, stayDaysInPeriod }: StayProps) {
  return (
    <tr>
      <td>
        <button className="input input-border" onClick={editStay}>
          {range?.from && range?.to ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}` : "Pick a date"}
        </button>
      </td>
      <td>
        {range?.from && range?.to ? Math.round(millisecondsToDays(range.to.getTime() - range.from.getTime()) + 1) : 0}
      </td>
      <td>
        {stayDaysInPeriod && Math.round(stayDaysInPeriod)}
      </td>
      <td>
        <button className="btn btn-error btn-xs btn-circle" onClick={deleteStay}><XMarkIcon className="size-4" /></button>
      </td>
    </tr>
  )
}
