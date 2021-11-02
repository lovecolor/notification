import { useHistory, useParams } from "react-router"
import { useState, useEffect } from "react"
import useAsync from "../../common/hooks/useAsync"
import { MainLayout } from "../layouts/MainLayout"
import { useHabitAppApiClient } from "../hooks/useHabitApiClient"
import { SpinnerPrimary } from "../components/SpinnerPrimary"
import { Habit } from "../services/api/types/Habit"
import { useLinks } from "../../common/hooks/useLinks"
import {
  Add,
  EditIcon,
  NotificationIcon,
  RepeatIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Square,
  HalfSquare,
  FireIcon,
  EnergyIcon,
  RateIcon,
  LeavesIcon,
} from "../../../assets/icons"
import { IconButtonPurple } from "../components/button/IconButtonPurple"
import styled from "styled-components"
import { Card } from "@material-ui/core"
import { color, spacing } from "../../theme"
import { HabitImage } from "../../../assets/images"
import { Caption } from "../components/text/Caption"
import { TextBody2 } from "../components/text/TextBody2"
import { useTranslation } from "react-i18next"
import { formatTime } from "../helpers/getDates"
import dayjs from "dayjs"
import { Subtitle2 } from "../components/text/Subtitle2"
import { getDatesInMonth } from "../helpers/getDates"
import { Subtitle1 } from "../components/text/Subtitle1"
import { filterActionWithDates } from "../helpers/filterActionWithDates"
import { AnalyticItem } from "../components/AnalyticItem"
import { ButtonPrimary } from "../components/button/ButtonPrimary"
import { ButtonWhite } from "../components/button/ButtonWhite"
import { IconButtonPrimary } from "../components/button/IconButtonPrimary"
import { PopupCompleteHabit } from "../components/PopupCompleteHabit"
import { ButtonBase } from "../components/button/ButtonBase"
import { ActionItem } from "../components/ActionItem"

export const HabitDetail = () => {
  const params: {
    habitId: string
  } = useParams()
  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [showPopup, setShowPopup] = useState(false)

  const api = useHabitAppApiClient()
  const history = useHistory()
  const links = useLinks()
  const { t } = useTranslation()
  const weekDays = [
    t("habit.newHabit.labels.sun"),
    t("habit.newHabit.labels.mon"),
    t("habit.newHabit.labels.tue"),
    t("habit.newHabit.labels.wed"),
    t("habit.newHabit.labels.thu"),
    t("habit.newHabit.labels.fri"),
    t("habit.newHabit.labels.sat"),
  ]

  const getHabit = useAsync<Habit>(() => api.getHabitById(params.habitId), true)
  const habit = getHabit.result
  const getCurrentStreak = useAsync(() => api.getCurrentStreak(params.habitId), true)
  const getLongestStreak = useAsync(() => api.getLongestStreak(params.habitId), true)
  const updateHabit = useAsync(async (data) => {
    const result = await api.updateHabit(data)
    if (result) {
      setShowPopup(true)
      getHabit.resolve({
        ...habit,
        isFinished: result.isFinished,
      } as Habit)
    }
  })

  const handleChangeCalendar = (month: number) => {
    setCurrentMonth(currentMonth.month(currentMonth.month() + month))
  }

  const handleAddHabit = () => {
    history.push(links.habit.newHabit())
  }

  const handleCompleteHabit = () => {
    const habit = getHabit.result
    habit &&
      updateHabit.run({
        id: habit.id,
        habit: {
          name: habit.name,
          type: habit.type,
          statisticType: habit.statisticType,
          goals: habit.goals,
          firstGoals: habit.firstGoals,
          isFinished: true,
          excludedReminderWeekdays: habit.excludedReminderWeekdays,
        },
      })
  }

  return habit ? (
    <MainLayout
      rightContent={
        <IconButtonPurple>
          <EditIcon />
        </IconButtonPurple>
      }
      backLink={links.habit.home()}
      title={habit.name}
    >
      {showPopup && <PopupCompleteHabit onClose={() => setShowPopup(false)} />}
      <Root>
        <Container>
          <HabitInfo>
            <Box>
              <HabitImage />
            </Box>
            <HabitData>
              <Caption>{habit.name}</Caption>
              <div>
                <NotificationIcon />
                <TextBody2>{t(`habit.statisticType.${habit.statisticType}`)}</TextBody2>
              </div>
              <div>
                <RepeatIcon />
                <TextBody2>
                  {t("habit.habitDetail.labels.reminders")}
                  {habit.dailyReminderTime.map((e) => formatTime(e.dailyTime)).join(", ")}
                </TextBody2>
              </div>
            </HabitData>
          </HabitInfo>
          <CustomCard>
            <Calendar>
              <MonthName>
                <div>
                  {!(
                    currentMonth.month() === dayjs(habit.startTime).month() &&
                    currentMonth.year() === dayjs(habit.startTime).year()
                  ) && <ArrowLeftIcon onClick={() => handleChangeCalendar(-1)} />}
                </div>
                <Caption>{currentMonth.format("MMMM")}</Caption>
                <div>
                  <ArrowRightIcon onClick={() => handleChangeCalendar(1)} />
                </div>
              </MonthName>
              <DateList>
                {weekDays.map((e) => (
                  <Subtitle2 key={e}>{e}</Subtitle2>
                ))}
                {getDatesInMonth(currentMonth)
                  .map((date) => ({
                    date,
                    action: filterActionWithDates(habit.dailyActions, [date])[0],
                  }))
                  .map((e) => (
                    <Box key={e.date.toString()} notInMonth={currentMonth.month() !== e.date.month()}>
                      <Subtitle1>{e.date.date()}</Subtitle1>
                      <ActionItemOrange item={e.action} goal={habit.goals}></ActionItemOrange> 
                    </Box>
                  ))}
              </DateList>
            </Calendar>
          </CustomCard>
        </Container>

        <LinearGradient />
        <Container>
          <Analytic>
            <Caption>{t("habit.habitDetail.labels.analytics")}</Caption>
            <div>
              <AnalyticItem
                value={`${getLongestStreak.result} ${t("habit.habitDetail.labels.days")}`}
                label={t("habit.habitDetail.labels.longestStreak")}
                icon={{
                  icon: <FireIcon />,
                  color: color.orange2Transparent2,
                }}
              />
              <AnalyticItem
                value={`${getCurrentStreak.result} ${t("habit.habitDetail.labels.days")}`}
                label={t("habit.habitDetail.labels.currentStreak")}
                icon={{
                  icon: <EnergyIcon />,
                  color: color.red2Transparent2,
                }}
              />
              <AnalyticItem
                value="98 %"
                label={t("habit.habitDetail.labels.completionRate")}
                icon={{
                  icon: <RateIcon />,
                  color: color.blue1Transparent2,
                }}
              />
              <AnalyticItem
                value={7}
                label={t("habit.habitDetail.labels.averageEasinessScore")}
                icon={{
                  icon: <LeavesIcon />,
                  color: color.purple2Transparent2,
                }}
              />
            </div>
            {!habit.isFinished && (
              <ButtonPrimary onClick={handleCompleteHabit}>
                {t("habit.habitDetail.actions.markHabitAsComplete")}
              </ButtonPrimary>
            )}
            <ButtonWhite>{t("habit.habitDetail.actions.markHabitAsMissed")}</ButtonWhite>
          </Analytic>
        </Container>
        <IconButtonPrimary onClick={handleAddHabit}>
          <Add />
        </IconButtonPrimary>
      </Root>
    </MainLayout>
  ) : (
    <CustomSpinner />
  )
}
const CustomCard = styled(Card)`
  border-radius: 12px;
  box-shadow: none;
  ${Caption} {
    font-weight: 700;
    padding: ${spacing.m} 0;
  }
`
const Box = styled.div<{ notInMonth?: boolean }>`
  border-radius: 12px;
  opacity: ${(props) => (props.notInMonth ? 0.5 : 1)};
`

const HabitInfo = styled(CustomCard)`
  width: 100%;
  display: flex;
  padding: ${spacing.m};
  margin-top: ${spacing.lx};
  margin-bottom: ${spacing.l};
  gap: ${spacing.l};
  ${Box} {
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${color.orange2Transparent1};
    flex-shrink: 0;
  }
`
const HabitData = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.s};
  overflow: hidden;
  div {
    display: flex;

    gap: ${spacing.m};
    svg {
      flex-shrink: 0;
    }
    ${TextBody2} {
      flex-grow: 1;
      opacity: 0.5;
    }
  }
`
const Root = styled.div`
  max-width: 414px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Container = styled.div`
  width: 100%;
  padding: 0 ${spacing.l};
`
const Calendar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const MonthName = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing.m} ${spacing.l};

  div {
    height: 26px;
    width: 20px;
    flex-shrink: 0;
    svg {
      cursor: pointer;
    }
  }
  ${Caption} {
    flex-grow: 1;
    text-align: center;
  }
`
const DateList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: ${spacing.s};
  grid-row-gap: ${spacing.m};
  padding: ${spacing.s};
  ${Subtitle2} {
    text-align: center;
    opacity: 0.5;
  }
  & > ${Box} {
    padding: ${spacing.s} 0;
    background-color: ${color.orange1};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: inherit;
    ${Subtitle1} {
      font-weight: 700;
      text-align: center;
    }
    div {
      width: 38px;
      height: 38px;
    }
  }
`
const ActionItemOrange = styled(ActionItem).attrs((props) => ({
  ...props,
  color: color.orange3,
}))``

const LinearGradient = styled.div`
  width: 100%;
  height: 30px;
  background: linear-gradient(180deg, #fbeadb 0%, #fff3e9 100%);
  transform: rotate(-180deg);
  margin-top: ${spacing.l};
`
const Analytic = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.xl};
  ${Caption} {
    margin: ${spacing.l} 0;
    text-align: center;
    opacity: 0.5;
  }
  & > div {
    width: 100%;
    border-radius: 12px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.xxs};
    overflow: hidden;
    margin-bottom: ${spacing.lx};
  }
  ${ButtonBase} {
    width: 100%;
    height: 60px;
    box-shadow: none;
    margin-bottom: ${spacing.m};
  }
`
const CustomSpinner = styled(SpinnerPrimary)`
  position: fixed;
  top: calc(50% - 20px);
  left: calc(50vw - 20px);
`
