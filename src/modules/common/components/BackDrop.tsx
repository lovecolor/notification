import { ReactNode } from "react"
import styled from "styled-components"
import { color, spacing } from "../../theme"
import { ClickAwayListener } from "@material-ui/core"

export type BackDropProps = {
  children: ReactNode
  onClose: () => void
}

export const BackDrop = (props: BackDropProps) => {
  return (
    <Root>
      <ClickAwayListener onClickAway={props.onClose}>{props.children}</ClickAwayListener>
    </Root>
  )
}
const Root = styled.div`
  position: fixed;
  z-index: 300;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: ${color.blackTransparent1};
  display: flex;
  justify-content: center;
  animation: showSlow 0.3s;
  @keyframes showSlow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
