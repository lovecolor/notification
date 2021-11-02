import { AxiosInstance } from "axios"
import { Action } from "../types/Action"
import { AddActionRequest } from "./types/AddActionRequest"
import { GetProfileStatisticsReponse } from "./types/GetProfileStatisticsReponse"
import { Habit } from "./types/Habit"
import { ProfileStatisticType } from "./types/ProfileStatisticType"

export const createHabitApiClient = (api: AxiosInstance) => {
  return {
    getHabit: getHabit(api),
    getActionsById: getActionsById(api),
    addNewHabit: addNewHabit(api),
    getHabitById: getHabitById(api),
    getCurrentStreak: getCurrentStreak(api),
    getLongestStreak: getLongestStreak(api),
    updateHabit: updateHabit(api),
    addAction: addAction(api),
    getProfileStatistics: getProfileStatistics(api),
  }
}

const getHabit = (api: AxiosInstance) => async (): Promise<Habit[] | undefined> => {
  try {
    const response = await api.get<Habit[]>(`/habits/no-pagination`)
    return response.data
  } catch (error) {
    Promise.reject(error)
  }
}

export type GetActionsByIdRequest = {
  habitId: string
  fromDate: string
  toDate: string
}
type GetActionsByIdResponse = {
  items: Action[]
}

const getActionsById =
  (api: AxiosInstance) =>
  async (data: GetActionsByIdRequest): Promise<Action[] | undefined> => {
    try {
      const response = await api.get<GetActionsByIdResponse>(`/actions`, {
        params: data,
      })
      return response.data.items
    } catch (error) {
      Promise.reject(error)
    }
  }

type AddActionReponse = {
  count: number
  date: string
  habit: {
    id: string
  }
  id: string
  isDeleted: boolean
}

const addAction =
  (api: AxiosInstance) =>
  async (data: AddActionRequest): Promise<AddActionReponse | undefined> => {
    try {
      const response = await api.post<AddActionReponse>(`/habits/${data.habitId}/action`, data.action)
      return response.data
    } catch (error) {
      Promise.reject(error)
    }
  }

type AddNewHabitRequest = {
  name: string
  type: string
  statisticType: string
  firstGoals: number
  goals: number
  excludedReminderWeekdays: string
}
const addNewHabit =
  (api: AxiosInstance) =>
  async (data: AddNewHabitRequest): Promise<Habit | undefined> => {
    try {
      const res = await api.post<Habit>("/habits", data)

      return res.data
    } catch (error: any) {
      return Promise.reject(error.message.join("\n"))
    }
  }

const getHabitById =
  (api: AxiosInstance) =>
  async (id: string): Promise<Habit | undefined> => {
    try {
      const res = await api.get<Habit>(`/habits/${id}`)

      return res.data
    } catch (error: any) {
      return Promise.reject(error.message.join("\n"))
    }
  }

type GetCurrentStreakReponse = {
  currentStreak: number
}
const getCurrentStreak =
  (api: AxiosInstance) =>
  async (id: string): Promise<number | undefined> => {
    try {
      const res = await api.get<GetCurrentStreakReponse>(`/statistics/current-streak/${id}`)

      return res.data.currentStreak
    } catch (error: any) {
      return Promise.reject(error.message.join("\n"))
    }
  }

type GetLongestStreakReponse = {
  longestStreak: number
}

const getLongestStreak =
  (api: AxiosInstance) =>
  async (id: string): Promise<number | undefined> => {
    try {
      const res = await api.get<GetLongestStreakReponse>(`/statistics/longest-streak/${id}`)

      return res.data.longestStreak
    } catch (error: any) {
      return Promise.reject(error.message.join("\n"))
    }
  }

type UpdateHabitRequest = {
  id: string
  habit: {
    name: string
    type: string
    statisticType: string
    goals: number
    firstGoals: number
    isFinished: boolean
    excludedReminderWeekdays: string
  }
}
type UpdateHabitReponse = {
  id: string
  name: string
  type: string
  isFinished: boolean
  statisticType: string
  goals: number
  firstGoals: number
  startTime: string
  excludedReminderWeekdays: string
  updateAt: string
  isDeleted: boolean
  userId: string
}
const updateHabit =
  (api: AxiosInstance) =>
  async (data: UpdateHabitRequest): Promise<UpdateHabitReponse | undefined> => {
    try {
      const res = await api.patch<UpdateHabitReponse>(`/habits/${data.id}`, data.habit)

      return res.data
    } catch (error: any) {
      return Promise.reject(error.message.join("\n"))
    }
  }

type GetTrackingHabitRequest = {
  type: ProfileStatisticType
}
const getProfileStatistics =
  (api: AxiosInstance) =>
  async (data: GetTrackingHabitRequest): Promise<GetProfileStatisticsReponse | undefined> => {
    try {
      const res = await api.get<GetProfileStatisticsReponse>(`/statistics/profile-sumary`, { params: data })

      return res.data
    } catch (error: any) {
      return Promise.reject(error.message.join("\n"))
    }
  }
