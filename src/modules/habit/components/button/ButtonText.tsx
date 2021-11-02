import { ReactNode } from "react"
import styled from "styled-components"

type ButtonTextProps = {
  onClick?: () => void
  children: ReactNode
}
export const ButtonText = (props: ButtonTextProps) => {
  return (
    <Root type="button" onClick={props.onClick}>
      {props.children}
    </Root>
  )
}
const Root = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`
