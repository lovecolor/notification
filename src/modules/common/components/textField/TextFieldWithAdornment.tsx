import { InputAdornment, TextField } from "@material-ui/core"
import { ReactNode } from "react"
import styled from "styled-components"

type TextFieldWithAdornmentProps = {
  startIcon?: ReactNode
  endIcon?: ReactNode
}
export const TextFieldWithAdornment = styled(TextField).attrs((props: TextFieldWithAdornmentProps) => ({
  InputProps: {
    startAdornment: <InputAdornment position="start">{props.startIcon}</InputAdornment>,
    endAdornment: <InputAdornment position="end">{props.endIcon}</InputAdornment>,
  },
  autoComplete: "off",
  ...props,
}))``
