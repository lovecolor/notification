import React from "react"
import styled from "styled-components"
import { spacing, color } from "../../theme"
import { useTranslation } from "react-i18next"
import { MainLayout } from "../layouts/MainLayout"
import { Quote } from "../../../assets/images"
import { Card, Avatar } from "@material-ui/core"
import background from "../../../assets/images/background-habit.svg"
import { useHabitAppApiClient } from "../hooks/useHabitApiClient"
import useAsync from "../../common/hooks/useAsync"
import { Habit } from "../services/api/types/Habit"
import { IconButtonPrimary } from "../components/button/IconButtonPrimary"
import { Add } from "../../../assets/icons"
import { useHistory } from "react-router"
import { useLinks } from "../../common/hooks/useLinks"
import { Subtitle1 } from "../components/text/Subtitle1"
import { DailyActionList } from "../components/DailyActionList"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

export const Home = () => {
  const history = useHistory()
  const links = useLinks()
  const api = useHabitAppApiClient()
  const addAction = useAsync(async (data) => {
    const result = await api.addAction(data)
    if (result) {
      getHabits.run()
    }
  })

  const getHabits = useAsync<Habit[]>(async () => await api.getHabit(), true)
  const habits = getHabits.result

  const { t } = useTranslation()

  const handleClickHabit = (id: string) => {
    history.push(links.habit.habitDetails(id))
  }

  return (
    <MainLayout
      title={t("habit.home.title")}
      rightContent={<AvatarDefault onClick={() => history.push(links.habit.profile())} />}
    >
      <Container>
        <QuoteContainer>
          <QuoteImage />
        </QuoteContainer>
        <HabitContainer>
          {habits && (
            <>
              <HabitNameContainer>
                <CustomCard>
                  <Subtitle1>{t("habit.home.labels.habits")}</Subtitle1>
                </CustomCard>
                {habits.map((habit) => (
                  <CustomCard key={habit.id} onClick={() => handleClickHabit(habit.id)}>
                    <Subtitle1>{habit.name}</Subtitle1>
                  </CustomCard>
                ))}
              </HabitNameContainer>
              <DailyActionList
                loading={addAction.loading}
                onAddAction={addAction.run}
                habits={habits}
              ></DailyActionList>
            </>
          )}
        </HabitContainer>
        <IconButtonPrimary onClick={() => history.push(links.habit.newHabit())}>
          <Add />
        </IconButtonPrimary>
      </Container>
    </MainLayout>
  )
}

const Container = styled.div`
  background: url(${background}) no-repeat bottom;
  max-width: 414px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${IconButtonPrimary} {
    margin: auto;
  }
`

const QuoteImage = styled(Quote)`
  margin-top: ${spacing.lx};
`
const QuoteContainer = styled.div`
  width: 100%;
  padding: 0 ${spacing.l};
`
const HabitContainer = styled.div`
  width: 100%;
  padding-left: ${spacing.l};
  display: flex;
  margin-bottom: ${spacing.lx};
`
const CustomCard = styled(Card)`
  box-shadow: none;
  border-radius: 12px 0 0 12px;
`
const HabitNameContainer = styled.div`
  cursor: pointer;
  width: 117px;
  flex-shrink: 0;
  gap: ${spacing.m};
  display: flex;
  flex-direction: column;
  ${CustomCard} {
    min-height: 70px;
    display: flex;
    align-items: center;
    padding-left: ${spacing.l};
    &:first-child {
      background: transparent;
    }
  }
  ${Subtitle1} {
    font-weight: 700;
    text-transform: capitalize;
  }
`
const AvatarDefault = styled(AccountCircleIcon)`
  width: 100%;
  height: 100%;
  color: ${color.purpleTransparent1};
`
