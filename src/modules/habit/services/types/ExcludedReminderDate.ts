import { Habit } from "./Habit"

export type ExcludedReminderDate = {
  id: string
  excludedReminderDate: string
  isEnable: boolean
  isDeleted: boolean
  habit: Habit
}
