import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { color } from "../../theme"
import { formatTime } from "../helpers/getDates"
import { Reminder } from "../services/api/types/Reminder"
import { TextBody1 } from "./text/TextBody1"
import { Toggle } from "./Toggle"

export type ReminderItemProps = {
  onChange: (reminder: Reminder) => void
  reminder: Reminder
}

export const ReminderItem = (props: ReminderItemProps) => {
  const { onChange, reminder } = props
  const { t } = useTranslation()
  return (
    <Box isEnable={reminder.isEnable}>
      <TextBody1>{formatTime(`${reminder.dailyTime}:00`)}</TextBody1>
      <Toggle
        checked={reminder.isEnable}
        label={t("habit.newHabit.labels.off")}
        checkLabel={t("habit.newHabit.labels.on")}
        onChange={(e) =>
          onChange({
            ...reminder,
            isEnable: e.target.checked,
          })
        }
      ></Toggle>
    </Box>
  )
}
const Box = styled.div<{ isEnable: boolean }>`
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => (props.isEnable ? color.orange1 : color.purple2)};
  border-radius: 12px;
  transition: background-color 0.3s;
  ${TextBody1} {
    font-weight: 700;
    color: ${(props) => (props.isEnable ? color.orange2 : color.purple1)};
    transition: color 0.3s;
    text-transform: uppercase;
  }
  ${Toggle} {
    .MuiSwitch-thumb {
      &:before {
        margin-left: -20px;
      }
      &:after {
        margin-left: 40px;
      }
    }
  }
`
