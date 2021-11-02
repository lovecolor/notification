import {  InputAdornment, TextField } from "@material-ui/core"
import { ReactNode } from "react"
import styled from "styled-components"
import { spacing, color } from "../../../theme"

type InputProps = { start?: ReactNode; end?: ReactNode }

export const Input = styled(TextField).attrs((props: InputProps) => ({
  InputProps: {
    startAdornment: <CustomInputAdornment position="start">{props.start ? props.start : ""}</CustomInputAdornment>,
    endAdornment: <InputAdornment position="end">{props.end ? props.end : ""}</InputAdornment>,
  },
  ...props,
}))``

const CustomInputAdornment = styled(InputAdornment)`
  height: 56px;
  padding: ${spacing.l};
  border-right: 1px solid ${color.orange1};
`
