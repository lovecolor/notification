import { DailyAction } from "../api/types/DailyAction"
import { ExcludedReminderDate } from "./ExcludedReminderDate"
import { ReminderTime } from "./ReminderTime"

export type Habit = {
  id: string
  name: string
  type: "Good" | "Bad"
  isFinished: boolean
  statisticType: "daily" | "weekly" | "monthly"
  goals: number
  firstGoals: number
  startTime: Date
  dailyReminderTime: ReminderTime
  excludedReminderWeekdays: ExcludedReminderDate
  updateAt: Date
  isDeleted: boolean
  userId: string
  dailyActions: DailyAction[]
}
