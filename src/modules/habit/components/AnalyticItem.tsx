import { ReactNode } from "react"
import styled from "styled-components"
import { spacing } from "../../theme"
import Heading2 from "./text/Heading2"
import { TextBody2 } from "./text/TextBody2"

export type AnalyticItemProps = {
  value: string | number
  label: string
  icon: {
    icon: ReactNode
    color: string
  }
  labelTop?: boolean
}

export const AnalyticItem = (props: AnalyticItemProps) => {
  return (
    <Root>
      <Content>
        {props.labelTop ? (
          <>
            <TextBody2>{props.label}</TextBody2>
            <Heading2>{props.value}</Heading2>
          </>
        ) : (
          <>
            <Heading2>{props.value}</Heading2>
            <TextBody2>{props.label}</TextBody2>
          </>
        )}
      </Content>
      <Icon color={props.icon.color}>{props.icon.icon}</Icon>
    </Root>
  )
}
const Root = styled.div`
  height: 95px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: ${spacing.l};
  padding: 0 ${spacing.l};
`
const Content = styled.div`
  flex-grow: 1;
  ${TextBody2} {
    opacity: 0.5;
  }
`
const Icon = styled.div<{ color: string }>`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: relative;
  flex-shrink: 0;
  background-color: ${(props) => props.color};
`
