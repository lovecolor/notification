import { Card, TextField } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { BackDrop } from "../../common/components/BackDrop"
import { color, spacing } from "../../theme"
import { Reminder } from "../services/api/types/Reminder"
import { ButtonPrimary } from "./button/ButtonPrimary"
import { ReminderItem } from "./ReminderItem"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { NotificationOffIcon } from "../../../assets/icons"
import { ButtonBase } from "./button/ButtonBase"

export type PopupReminderListProps = {
  reminders: Reminder[]
  onChangeReminder: (reminder: Reminder) => void
  onTurnOffAll: () => void
  handleClose: () => void
}

export const PopupReminderList = (props: PopupReminderListProps) => {
  const { t } = useTranslation()

  const { register, handleSubmit } = useForm<Reminder>({
    defaultValues: {
      isEnable: true,
    },
  })

  const onSubmit = handleSubmit((data) => props.onChangeReminder(data))

  return (
    <BackDrop onClose={props.handleClose}>
      <CustomCard>
        <Reminders>
          {props.reminders
            .sort((a, b) => {
              const [hourA, minuteA] = a.dailyTime.split(":")
              const [hourB, minuteB] = b.dailyTime.split(":")
              return +hourA * 60 + +minuteA - (+hourB * 60 + +minuteB)
            })
            .map((reminder) => (
              <ReminderItem key={reminder.dailyTime} reminder={reminder} onChange={props.onChangeReminder} />
            ))}
        </Reminders>
        <Actions>
          <form onSubmit={onSubmit}>
            <TextField
              label={t("habit.newHabit.labels.reminder")}
              type="time"
              defaultValue="07:30"
              {...register("dailyTime")}
            />
            <ButtonPrimary type="submit">{t("habit.newHabit.actions.addReminder")}</ButtonPrimary>
          </form>
          <ButtonBase onClick={props.onTurnOffAll}>
            <NotificationOffIcon />
          </ButtonBase>
        </Actions>
      </CustomCard>
    </BackDrop>
  )
}
const CustomCard = styled(Card)`
  margin-top: auto;
  min-width: 414px;
  border-radius: 12px 12px 0px 0px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  padding: ${spacing.l};
  gap: ${spacing.lx};
`
const Reminders = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${spacing.m};
`
const Actions = styled.div`
  width: 100%;
  display: flex;
  gap: ${spacing.m};
  ${ButtonPrimary} {
    flex-grow: 1;
  }
  form {
    flex-grow: 1;
    display: flex;
    gap: ${spacing.m};
  }
  & > ${ButtonBase} {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    background: white;
    border-radius: 8px;
    border: 2px solid ${color.purple1Transparent3};
  }
`
