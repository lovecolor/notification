import { Habit } from "./Habit"

export type Action = {
  id: string
  date: string
  count: number
  isDeleted: boolean
  habit: Habit
}
