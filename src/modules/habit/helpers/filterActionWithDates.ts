import dayjs, { Dayjs } from "dayjs"
import { DailyAction } from "../services/api/types/DailyAction"
const DATE_FORMAT = "DD-MM-YYYY"

export const filterActionWithDates = (actions: DailyAction[], dates: Dayjs[]): DailyAction[] => { 
  return actions.filter((action) =>
    dates.find((date) => dayjs(action.date).format(DATE_FORMAT) === date.format(DATE_FORMAT))
  )
}
