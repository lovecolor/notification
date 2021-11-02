import dayjs, { Dayjs } from "dayjs"
import weekday from "dayjs/plugin/weekday"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(weekday)
dayjs.extend(customParseFormat)
export const getCurrentWeekDates = (): Dayjs[] => {
  return [
    dayjs().weekday(1),
    dayjs().weekday(2),
    dayjs().weekday(3),
    dayjs().weekday(4),
    dayjs().weekday(5),
    dayjs().weekday(6),
    dayjs().weekday(7),
  ]
}

export const getDatesInMonth = (date: Dayjs): Dayjs[] => {
  return [
    ...Array.from({ length: date.startOf("month").weekday() - 0 }, (v, i) => date.date(0).subtract(i, "day")),
    ...Array.from({ length: date.daysInMonth() }, (v, i) => date.date(i + 1)),
    ...Array.from({ length: 6 - date.endOf("month").weekday() }, (v, i) => date.date(32).add(i, "day")),
  ]
}
export const formatTime = (time: string) => {
  return dayjs(time, "HH:mm:ss").format("h:mm a")
}
