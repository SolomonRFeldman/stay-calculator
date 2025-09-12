import { useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Stay from "./Stay"
import type { Stay as StayType } from "./Stay"
import { DayPicker } from "react-day-picker"
import totalStayDays from "../utils/total_stay_days"
import uniqueStays from "../utils/unique_stays"
import useStays, { getStayRangesFromStays } from "../hooks/use_stays"

const sortStays = (stays: StayType[]) => {
  return stays.sort((stayA, stayB) => {
    if (stayA.range?.to && stayB.range?.to) {
      return stayA.range.to.getTime() - stayB.range.to.getTime()
    }
    if (stayA.range?.to) return -1
    if (stayB.range?.to) return 1
    return 0
  })
}

export default function Stays() {
  const [stays, setStays] = useStays()
  const [selectedStayId, setSelectedStayId] = useState<string | null>(null)
  const selectedStay = stays.find((s) => s.id === selectedStayId)
  const hasNewStay = stays.some((stay) => !stay.range)
  const uniqueStayRanges = uniqueStays(getStayRangesFromStays(stays).filter((stay) => stay !== undefined && stay !== null))

  const handleAddStay = () => { setStays((prevStays) => [...prevStays, { id: uuidv4() }]) }
  const handleUpdateStay = (updatedStay: StayType) => {
    setStays((prevStays) => prevStays.map((stay) => stay.id === updatedStay.id ? updatedStay : stay))
  }
  const handleDeleteStay = (stayId: string) => {
    if (stays.length === 1) setStays([{ id: uuidv4() }])
    else setStays((prevStays) => prevStays.filter((stay) => stay.id !== stayId))
  }

  const datePickerRef = useRef<HTMLDivElement>(null)
  if (datePickerRef.current) {
    if (selectedStay) datePickerRef.current.showPopover()
    else datePickerRef.current.hidePopover()
  }

  return(
    <div className="flex flex-col gap-2 items-center">
      <table className="table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Days</th>
            <th className="max-w-1">out of 180</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortStays(stays).map((stay) => (
            <Stay
              key={stay.id}
              stay={stay}
              editStay={() => { setSelectedStayId(stay.id); }}
              deleteStay={() => { handleDeleteStay(stay.id); }}
              stayDaysInPeriod={stay.range?.to && totalStayDays(uniqueStayRanges, stay.range.to, 180)}
            />
          ))}
        </tbody>
      </table>
      {hasNewStay || <button className="btn btn-primary" onClick={handleAddStay}>Add Stay</button>}
      <div ref={datePickerRef} onToggle={({ newState }) => {
        if (newState === "closed") setSelectedStayId(null)
      }}
      popover="auto" className="dropdown">
        <DayPicker
          className="react-day-picker"
          classNames={{ selected: "bg-neutral-content", range_middle: "bg-neutral-content", focused: "" }}
          mode="range"
          selected={selectedStay?.range}
          onSelect={(range) => selectedStay && handleUpdateStay({ ...selectedStay, range }) }
        />
      </div>
    </div>
  )
}
