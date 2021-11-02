import { AxiosInstance } from "axios"
import { User } from "../types/User"

export const createAuthApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    signUp: signUp(api),
    getCurrentUser: getCurrentUser(api),
    changePassword: changePassword(api),
    requestResetPassword: requestResetPassword(api),
  }
}

type LoginResponse = {
  accessToken: string
}

type LoginRequest = {
  email: string
  password: string
}
const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<LoginResponse | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/auth/sign-in", data)

      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

export type SignUpRequest = {
  email: string
  lastName: String
  firstName: string
  password: string
}

const signUp =
  (api: AxiosInstance) =>
  async (data: SignUpRequest): Promise<boolean | undefined> => {
    try {
      await api.post(`/auth/sign-up`, data)
      return true
    } catch (err) {
      return Promise.reject(err)
    }
  }

const getCurrentUser = (api: AxiosInstance) => async (): Promise<User | undefined> => {
  try {
    const res = await api.get<User>("/users/me")

    return res.data
  } catch (error) {}
}

export type ChangePasswordRequest = {
  email: string
  password: string
  code: string
}

const changePassword =
  (api: AxiosInstance) =>
  async (data: ChangePasswordRequest): Promise<boolean | undefined> => {
    try {
      await api.post(`/password/change`, data)
      return true
    } catch (err) {
      return Promise.reject(err)
    }
  }

type ForgotPasswordRequest = {
  email: string
}

const requestResetPassword =
  (api: AxiosInstance) =>
  async (data: ForgotPasswordRequest): Promise<boolean | undefined> => {
    try {
      const result = await api.post<User>("/password/forget", data)

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
