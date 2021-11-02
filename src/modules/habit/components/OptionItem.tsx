import { ReactNode } from "react"
import styled from "styled-components"
import { Card, Box } from "@material-ui/core"
import { color, spacing } from "../../theme"
import { ArrowRightIcon } from "../../../assets/icons"
import { Caption } from "./text/Caption"
import { Subtitle1 } from "./text/Subtitle1"

export type OptionItemProps = {
  icon: ReactNode
  title: string
  description?: string
  endText?: string
}

export const OptionItem = (props: OptionItemProps) => {
  return (
    <Root>
      <CustomBox>
        <BlockOrange>{props.icon}</BlockOrange>
        <Content>
          <Caption>{props.title}</Caption>
          {props.description && <Subtitle1>{props.description}</Subtitle1>}
        </Content>
        {props.endText && <Caption>{props.endText}</Caption>}
        <ArrowRightIcon />
      </CustomBox>
    </Root>
  )
}

const Root = styled(Card)`
  cursor: pointer;
  border-radius: 12px;
  box-shadow: none;
  width: 100%;
`
const CustomBox = styled(Box).attrs((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 1,
  ...props,
}))`
  & > ${Caption} {
    font-weight: 700;
    margin-right: ${spacing.m};
  }
`
const BlockOrange = styled.div`
  border-radius: 12px;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color.orange1};
  flex-shrink: 0;
`
const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${spacing.m} 0;
  margin: 0 ${spacing.l};
  ${Subtitle1} {
    opacity: 0.5;
  }
`
