import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { ArrowDownIcon, ArrowRightIcon, BackIcon, CheckIcon } from "../../../assets/icons"
import { MainLayout } from "../layouts/MainLayout"
import background from "../../../assets/images/background-habit.svg"
import { spacing, color } from "../../theme"
import InputWhite from "../components/input/InputWhite"
import { Card, Checkbox, FormControlLabel, FormGroup, Select, MenuItem } from "@material-ui/core"
import { Caption } from "../components/text/Caption"
import { Subtitle2 } from "../components/text/Subtitle2"
import { Controller, useForm } from "react-hook-form"
import { Toggle } from "../components/Toggle"
import { useEffect, useState, ChangeEvent } from "react"
import { useLinks } from "../../common/hooks/useLinks"
import Heading2 from "../components/text/Heading2"
import { Subtitle1 } from "../components/text/Subtitle1"
import { NewHabitImage } from "../../../assets/images"
import { IconButtonPrimary } from "../components/button/IconButtonPrimary"
import { useHabitAppApiClient } from "../hooks/useHabitApiClient"
import useAsync from "../../common/hooks/useAsync"
import { useSnackbar } from "notistack"
import { SpinnerPrimary } from "../components/SpinnerPrimary"
import { TextError } from "../components/text/TextError"
import { useHistory } from "react-router"
import { Reminder } from "../services/api/types/Reminder"
import { PopupReminderList } from "../components/PopupReminderList"
import { StatisticType } from "../services/api/types/StatisticType"
import { HabitType } from "../services/api/types/HabitType"

type NewHabitForm = {
  name: string
  type: HabitType
  statisticType: StatisticType
  firstGoals?: string
  goals: string
  excludedReminderWeekdays: string[]
  reminderTimes: Reminder[]
}
export const NewHabit = () => {
  const { t } = useTranslation()

  const [showReminders, setShowReminders] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewHabitForm>({
    defaultValues: {
      excludedReminderWeekdays: [],
      statisticType: StatisticType.Daily,
      type: HabitType.Good,
      reminderTimes: [],
    },
  })
  const watchStatisticType = watch("statisticType")
  const watchReminderTimes = watch("reminderTimes")
  const { enqueueSnackbar } = useSnackbar()
  const api = useHabitAppApiClient()
  const links = useLinks()
  const history = useHistory()

  const addNewHabit = useAsync(async (data) => {
    const result = await api.addNewHabit(data)
    if (result) {
      enqueueSnackbar(t("habit.newHabit.messages.addNewHabitSuccess"), { variant: "success" })
      reset()
      history.push(links.habit.home())
    }
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    if (!data.firstGoals) {
      delete data.firstGoals
      addNewHabit.run({
        ...data,
        goals: parseInt(data.goals),
        excludedReminderWeekdays: data.excludedReminderWeekdays.join(","),
      })
    } else {
      addNewHabit.run({
        ...data,
        firstGoals: parseInt(data.firstGoals),
        goals: parseInt(data.goals),
        excludedReminderWeekdays: data.excludedReminderWeekdays.join(","),
      })
    }
  })

  const handleAddReminder = (newReminder: Reminder) => {
    const index = watchReminderTimes.findIndex((reminder: Reminder) => reminder.dailyTime === newReminder.dailyTime)

    const newReminders =
      index >= 0
        ? watchReminderTimes.map((reminder: Reminder, idx: number) => (idx === index ? newReminder : reminder))
        : [...watchReminderTimes, newReminder]
    setValue("reminderTimes", newReminders)
  }

  const handleTurnOffAllReminder = () => {
    setValue(
      "reminderTimes",
      watchReminderTimes.map((reminder) => ({
        ...reminder,
        isEnable: false,
      }))
    )
  }

  const weekDays = [
    t("habit.newHabit.labels.sun"),
    t("habit.newHabit.labels.mon"),
    t("habit.newHabit.labels.tue"),
    t("habit.newHabit.labels.wed"),
    t("habit.newHabit.labels.thu"),
    t("habit.newHabit.labels.fri"),
    t("habit.newHabit.labels.sat"),
  ]

  const handleChangeReminderCheckbox = (e: ChangeEvent<HTMLInputElement>, date: string) => {
    const excludedReminderWeekdays = getValues("excludedReminderWeekdays")

    if (e.target.checked) {
      setValue(
        "excludedReminderWeekdays",
        excludedReminderWeekdays.filter((e) => e !== date)
      )
    } else {
      setValue("excludedReminderWeekdays", [...excludedReminderWeekdays, date])
    }
  }

  const onChangeTypeHabit = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("type", e.target.checked ? HabitType.Good : HabitType.Bad)
  }

  return (
    <MainLayout backLink={links.habit.home()} title={t("habit.newHabit.title")}>
      {showReminders && (
        <PopupReminderList
          reminders={watchReminderTimes}
          onTurnOffAll={handleTurnOffAllReminder}
          onChangeReminder={handleAddReminder}
          handleClose={() => setShowReminders(false)}
        />
      )}
      <Root>
        <Wrapper>
          <Form onSubmit={onSubmit}>
            <FormContainer>
              <CustomInputWhite
                {...register("name", {
                  required: { value: true, message: t("habit.newHabit.messages.nameIsRequired") },
                })}
                error={!!errors.name}
                helperText={errors?.name?.message}
                placeholder={t("habit.newHabit.labels.enterHabitName")}
              />

              <CustomCard>
                <Box>
                  <Caption>{t("habit.newHabit.labels.statisticType")}</Caption>
                  <CustomSelect {...register("statisticType")} defaultValue="daily">
                    <MenuItem value={StatisticType.Daily}>{t(`habit.statisticType.daily`)}</MenuItem>
                    <MenuItem value={StatisticType.Weekly}>{t("habit.statisticType.weekly")}</MenuItem>
                    <MenuItem value={StatisticType.Monthly}>{t("habit.statisticType.monthly")}</MenuItem>
                  </CustomSelect>
                </Box>
              </CustomCard>
              {watchStatisticType !== StatisticType.Daily && (
                <CustomInputWhite
                  {...register("firstGoals")}
                  placeholder={t("habit.newHabit.labels.firstGoals")}
                  type="number"
                />
              )}

              <CustomInputWhite
                {...register("goals", {
                  required: { value: true, message: t("habit.newHabit.messages.goalIsRequired") },
                })}
                error={!!errors.goals}
                helperText={errors?.goals?.message}
                placeholder={t("habit.newHabit.labels.goals")}
                type="number"
              />
              <CustomCard>
                <ReminderDate>
                  <Caption>{t("habit.newHabit.labels.reminderWeekdays")}</Caption>
                  <CustomFormGroup>
                    {weekDays.map((date) => (
                      <FormControlLabel
                        key={date}
                        value={date}
                        control={
                          <Checkbox
                            onChange={(e) => handleChangeReminderCheckbox(e, date.toLowerCase())}
                            defaultChecked
                            color="primary"
                          />
                        }
                        label={<LabelCheckbox>{date}</LabelCheckbox>}
                        labelPlacement="top"
                      />
                    ))}
                  </CustomFormGroup>
                </ReminderDate>
              </CustomCard>
              <CustomCard>
                <Box>
                  <Caption>{t("habit.newHabit.labels.reminder")}</Caption>
                  <div onClick={() => setShowReminders(true)}>
                    <Caption>{t("habit.newHabit.actions.detail")}</Caption>
                    <ArrowRightIcon />
                  </div>
                </Box>
              </CustomCard>
              <CustomCard>
                <TypeContainer>
                  <FormControlLabel
                    control={
                      <Toggle
                        label={t("habit.newHabit.labels.bad")}
                        checkLabel={t("habit.newHabit.labels.good")}
                        onChange={onChangeTypeHabit}
                        defaultChecked
                      />
                    }
                    label={<Caption>{t("habit.newHabit.labels.type")}</Caption>}
                    labelPlacement="start"
                  />
                </TypeContainer>
              </CustomCard>
              {addNewHabit.error && <TextError>{addNewHabit.error}</TextError>}
            </FormContainer>

            <Quote>
              <CustomImage />
              <Heading2>{t("habit.newHabit.labels.startThisHabit")}</Heading2>
              <Subtitle1>{t("habit.newHabit.labels.description")}</Subtitle1>
              <CustomArrowIcon />
            </Quote>
            {addNewHabit.loading ? (
              <SpinnerPrimary />
            ) : (
              <IconButtonPrimary type="submit">
                <CheckIcon />
              </IconButtonPrimary>
            )}
          </Form>
        </Wrapper>
      </Root>
    </MainLayout>
  )
}

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  color: ${color.purple1};
`
const Wrapper = styled.div`
  max-width: 414px;
  margin: auto;
  height: 100%;
  background: url(${background}) no-repeat bottom;
  padding: 0 ${spacing.l};
  position: relative;
`
const Form = styled.form`
  text-align: center;
  width: 100%;
  margin-top: ${spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  ${IconButtonPrimary} {
    margin-top: ${spacing.l};
  }
`
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.m};
`
const CustomInputWhite = styled(InputWhite)`
  div {
    div:nth-last-child(3) {
      display: none;
    }
  }
`
const CustomFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  border-top: 1px solid ${color.orange1};
  label {
    padding: ${spacing.m};
    width: calc(100% / 7);
    margin: 0;
    border-right: 1px solid ${color.orange1};
    &:last-child {
      border: none;
    }
  }
`
const CustomCard = styled(Card)`
  box-shadow: none;
  border-radius: 12px;
  overflow: visible;
`
const ReminderDate = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${Caption} {
    margin: ${spacing.l} 0;
  }
`
const LabelCheckbox = styled(Subtitle2)`
  color: ${color.purple1};
  opacity: 0.5;
`

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${spacing.l};
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    ${Caption} {
      font-weight: 700;
      color: ${color.orange2};
    }
    svg {
      path {
        stroke: ${color.orange2};
      }
    }
  }
`
const Quote = styled(CustomCard)`
  width: 100%;
  text-align: center;
  align-items: center;
  padding: 0 ${spacing.xl};
  padding-top: ${spacing.xxl};
  position: relative;
  margin-top: 7rem;
  ${Heading2} {
    font-weight: 400;
  }
  ${Subtitle1} {
    opacity: 0.5;
  }
`
const CustomArrowIcon = styled(ArrowDownIcon)`
  margin: ${spacing.l};
`
const CustomImage = styled(NewHabitImage)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`
const CustomSelect = styled(Select)`
  min-width: 90px;
  &:before,
  :after {
    display: none;
  }
  padding: 0 ${spacing.l};
  color: ${color.orange2};
  background: rgba(253, 167, 88, 0.2);
  border-radius: 15px;
  font-family: "Manrope";
  font-weight: 700;
  font-size: 14px;
  svg {
    width: 24px;
    height: 24px;
    path {
      stroke: ${color.orange2};
      fill: ${color.orange2};
    }
  }
  div {
    &:focus,
    :active {
      background-color: transparent;
    }
  }
`
const TypeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${spacing.m} 0;
  label {
    justify-content: space-between;
    width: 100%;
    margin-right: ${spacing.l};
  }
`
