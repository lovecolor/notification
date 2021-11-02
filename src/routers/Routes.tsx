import { Redirect, Route } from "react-router"
import styled from "styled-components"
import { useAuth } from "../modules/common/contexts/AuthProvider"
import { useLinks } from "../modules/common/hooks/useLinks"
import { SpinnerPrimary } from "../modules/habit/components/SpinnerPrimary"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"

export const Routes = () => {
  const links = useLinks()
  const { user } = useAuth()
  const token = localStorage.getItem("token")
  const isGettingUser = false
  return (
    <>
      {isGettingUser ? (
        <CustomSpinner />
      ) : (
        <>
          <Route path="/" exact>
            {user ? <Redirect to={links.habit.home()} /> : <Redirect to={links.habit.login()} />}
          </Route>

          {user ? <PrivateRoutes /> : <PublicRoutes />}
        </>
      )}
    </>
  )
}
const CustomSpinner = styled(SpinnerPrimary)`
  position: fixed;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
`
