import { CircularProgress } from "@material-ui/core"
import styled from "styled-components"

export const SpinnerPrimary = styled(CircularProgress).attrs((props) => ({
  color: "primary",
  ...props,
}))``
