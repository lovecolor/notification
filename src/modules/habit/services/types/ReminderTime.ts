import { Habit } from "./Habit"

export type ReminderTime = {
  id: string
  dailyTime: string
  isEnable: boolean
  isDeleted: string
  habit: Habit
}
