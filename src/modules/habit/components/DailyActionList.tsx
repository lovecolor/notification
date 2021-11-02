import { Card, CircularProgress } from "@material-ui/core"
import dayjs from "dayjs"
import { useState } from "react"
import styled from "styled-components"
import { color, spacing } from "../../theme"
import { filterActionWithDates } from "../helpers/filterActionWithDates"
import { getCurrentWeekDates } from "../helpers/getDates"
import { renderColorByName } from "../helpers/renderColorByName"
import { AddActionRequest } from "../services/api/types/AddActionRequest"
import { Habit } from "../services/api/types/Habit"
import { ActionItem } from "./ActionItem"
import { Caption } from "./text/Caption"
import { Subtitle2 } from "./text/Subtitle2"
import { TypographyBase } from "./text/TypographyBase"

export type DailyActionListProps = {
  habits: Habit[]
  onAddAction: (data: AddActionRequest) => void
  loading: boolean
}

export const DailyActionList = (props: DailyActionListProps) => {
  const [actionPosting, setActionPosting] = useState<AddActionRequest | null>(null)
  const currentWeekDates = getCurrentWeekDates()

  const handlePostAction = (data: AddActionRequest) => {
    props.onAddAction(data)
    setActionPosting(data)
  }

  return (
    <Root>
      <CustomCard>
        {currentWeekDates.map((date) => (
          <CustomCard key={date.toString()}>
            <WeekDate isToday={date.day() === dayjs(new Date()).day()}>
              <Subtitle2>{date.format("ddd")}</Subtitle2>
              <Caption>{date.date()}</Caption>
            </WeekDate>
          </CustomCard>
        ))}
      </CustomCard>
      {props.habits.map((habit) => {
        const color = renderColorByName(habit.name)
        const actions = currentWeekDates.map((date) => filterActionWithDates(habit.dailyActions, [date])[0])
        return (
          <CustomCard key={habit.id}>
            {actions.map((action, idx) => {
              const date = currentWeekDates[idx].format("DD-MM-YYYY")
              return (
                <div
                  key={idx}
                  onClick={() =>
                    handlePostAction({
                      habitId: habit.id,
                      action: {
                        count: 1,
                        date,
                      },
                    })
                  }
                >
                  <ActionItem
                    loading={
                      actionPosting &&
                      habit.id === actionPosting.habitId &&
                      date === actionPosting?.action.date &&
                      props.loading
                    }
                    color={color}
                    item={action}
                    goal={habit.goals}
                  />
                  {actionPosting &&
                    habit.id === actionPosting.habitId &&
                    date === actionPosting?.action.date &&
                    props.loading && <Spinner spinnerColor={color} />}
                </div>
              )
            })}
          </CustomCard>
        )
      })}
    </Root>
  )
}
const CustomCard = styled(Card)`
  box-shadow: none;
`
const WeekDate = styled.div<{ isToday: boolean }>`
  position: relative;
  border-radius: inherit;
  min-width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${TypographyBase} {
    font-weight: 700;
  }
  ${Subtitle2} {
    opacity: 0.5;
    text-transform: uppercase;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    width: 16px;
    border-radius: 50rem;
    border: 1px solid ${color.purple1};
    box-shadow: 0px 2px 6px rgba(87, 51, 83, 0.5);
    display: ${(props) => (props.isToday ? "block" : "none")};
  }
`
const Spinner = styled(CircularProgress)<{ spinnerColor: string }>`
  position: absolute !important;
  svg {
    width: 30px;
    height: 30px;
    circle {
      stroke: ${(props) => props.spinnerColor};
    }
  }
`
const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m};
  margin-left: ${spacing.xxs};
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 5px;
    border-radius: 50rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${color.purple1Transparent3};
    border-radius: 50rem;
  }

  & > ${CustomCard} {
    width: calc(50px * 7 + ${spacing.m} * 6 + ${spacing.l} * 2);
    padding: 0 ${spacing.l};
    display: flex;
    align-items: center;
    min-height: 70px;
    gap: ${spacing.m};

    &:first-child {
      background: transparent;
    }
    ${CustomCard} {
      border-radius: 12px;
    }
    & > div {
      cursor: pointer;
      min-width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }
`
