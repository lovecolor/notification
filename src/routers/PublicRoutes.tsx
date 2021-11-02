import { Route } from "react-router"
import { useLinks } from "../modules/common/hooks/useLinks"
import { ChangePassword } from "../modules/habit/pages/ChangePassword"
import { ForgotPassword } from "../modules/habit/pages/ForgotPassword"
import { SignUp } from "../modules/habit/pages/SignUp"
import { Login } from "../modules/habit/pages/Login"

export const PublicRoutes = () => {
  const links = useLinks()

  return (
    <>
      <Route path={links.habit.login()}>
        <Login />
      </Route>
      <Route path={links.habit.signUp()}>
        <SignUp />
      </Route>
      <Route path={links.habit.forgotPassword()}>
        <ForgotPassword />
      </Route>
      <Route path={links.habit.changePassword()}>
        <ChangePassword />
      </Route>
    </>
  )
}
