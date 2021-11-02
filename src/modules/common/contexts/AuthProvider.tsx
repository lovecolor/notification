import React from "react"
import { useEffect, createContext, useContext } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAuthApiClient } from "../hooks/useAuthApiClient"
import { User } from "../services/types/User"

const AuthContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: (user: User | null) => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be called inside an AuthProvider`)
  }
  return context
}

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null)

  const api = useAuthApiClient()

  const currentUser = useAsync(async () => {
    const result = await api.getCurrentUser()

    if (result) {
      setUser(result)
    }
  })

  const contextValue = {
    user,
    setUser,
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      currentUser.run()
    }
  }, [])

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
