import { DailyAction } from "./DailyAction"
import { DailyReminderTime } from "./DailyReminderTime"
import { ExcludedReminderDate } from "./ExcludedReminderDate"
import { StatisticType } from "./StatisticType"
export type Habit = {
  id: string
  name: string
  type: string
  statisticType: StatisticType
  isFinished: boolean
  firstGoals: number
  goals: number
  startTime: string
  dailyReminderTime: DailyReminderTime[]
  excludedReminderDate: ExcludedReminderDate[]
  excludedReminderWeekdays: string
  updateAt: string
  isDeleted: boolean
  userId: string
  dailyActions: DailyAction[]
}
