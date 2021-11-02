import { Link } from "react-router-dom"
import { ReactNode } from "react"
import styled from "styled-components"
import { spacing } from "../../../theme"
import { Subtitle1 } from "../text/Subtitle1"

type ButtonLinkProps = {
  link: string
  children: ReactNode
}
export const ButtonLink = (props: ButtonLinkProps) => {
  return (
    <Root>
      <Link to={props.link}>
        <Text>{props.children}</Text>
      </Link>
    </Root>
  )
}
const Root = styled.div`
  a {
    text-decoration: none;
  }
  margin: 0 ${spacing.xxs};
`
const Text = styled(Subtitle1)`
  font-weight: 700;
`
