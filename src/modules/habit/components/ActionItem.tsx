import { DailyAction } from "../services/api/types/DailyAction"
import styled from "styled-components"
import { spacing } from "../../theme"
import { Square, HalfSquare } from "../../../assets/icons"

export type ActionItemProps = {
  item: DailyAction | undefined
  color: string
  goal: number
  loading?: boolean | null
}

export const ActionItem = (props: ActionItemProps) => {
  return (
    <Root loading={props.loading} color={props.color}>
      {props.item && (props.item.count >= props.goal ? <SquareIcon /> : <HalfSquareIcon />)}
   
    </Root>
  )
}
const Root = styled.div<{ color: string; loading: boolean | undefined | null }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  padding: ${spacing.xs};
  position: relative;
  color: ${(props) => props.color};
  display: flex;
  align-items: flex-end;

  opacity: ${(props) => (props.loading ? 0.5 : 1)};
  &:before {
    border-radius: inherit;
    content: "";
    background: currentColor;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  svg {
    path {
      fill: currentColor;
    }
    rect {
      fill: currentColor;
    }
  }
`
const SquareIcon = styled(Square)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`
const HalfSquareIcon = styled(HalfSquare)`
  width: 90%;
  height: 90%;
`
