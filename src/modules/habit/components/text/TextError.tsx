import { Typography } from "@material-ui/core"
import styled from "styled-components"

export const TextError = styled(Typography).attrs((props) => ({
  variant: "subtitle1",
  color: "error",
  ...props,
}))`
  font-weight: bold;
`
