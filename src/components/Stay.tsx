import { DateRange } from "react-day-picker"

export type Stay = {
  id: string
  range?: DateRange
}

type StayProps = {
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
        {range?.from && range?.to ? Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 3600 * 24) + 1) : 0} days
      </td>
      <td>
        {stayDaysInPeriod && Math.round(stayDaysInPeriod)}
      </td>
      <td>
        <button className="btn btn-error btn-sm" onClick={deleteStay}>X</button>
      </td>
    </tr>
  )
}
