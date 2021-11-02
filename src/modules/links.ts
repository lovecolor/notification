export const getAppLinks = () => {
  const common = {}

  const admin = {}

  const habit = {
    home: () => "/home",
    login: () => "/login",
    signUp: () => "/sign-up",
    changePassword: () => "/change-password",
    forgotPassword: () => "/forgot-password",
    newHabit: () => "/new-habit",
    habitDetails: (habitId = ":habitId") => `/habit/${habitId}`,
    profile: () => "/profile",
  }

  return {
    common,
    admin,
    habit,
  }
}
