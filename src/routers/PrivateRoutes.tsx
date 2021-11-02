import { Route } from "react-router"
import { useLinks } from "../modules/common/hooks/useLinks"
import { FirebaseNotification } from "../modules/habit/components/FirebaseNotification"
import { HabitDetail } from "../modules/habit/pages/HabitDetails"
import { Home } from "../modules/habit/pages/Home"
import { NewHabit } from "../modules/habit/pages/NewHabit"
import { Profile } from "../modules/habit/pages/Profile"

export const PrivateRoutes = () => {
  const links = useLinks()

  return (
    <>
      <FirebaseNotification />
      <Route path={links.habit.home()}>
        <Home />
      </Route>
      <Route path={links.habit.newHabit()}>
        <NewHabit />
      </Route>
      <Route path={links.habit.habitDetails()}>
        <HabitDetail />
      </Route>
      <Route path={links.habit.profile()}>
        <Profile />
      </Route>
    </>
  )
}
