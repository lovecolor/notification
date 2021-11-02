export type AddActionRequest = {
  habitId: string
  action: {
    count: number
    date: string
  }
}
