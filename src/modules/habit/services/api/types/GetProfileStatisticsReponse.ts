export type ProfileStatistic = {
  completed: number
  goalPerDay: number
  percent: number
  date: string
}

export type GetProfileStatisticsReponse = {
  longestStreak: number
  taskCompleted: number
  items: ProfileStatistic[]
}
