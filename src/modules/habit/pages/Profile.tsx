import { Card, InputBase, NativeSelect, CircularProgress, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { Add, CardIcon, EditIcon, FlagIcon, MedalIcon } from "../../../assets/icons"
import { NewHabitImage } from "../../../assets/images"
import { useAuth } from "../../common/contexts/AuthProvider"
import { useLinks } from "../../common/hooks/useLinks"
import { spacing, color } from "../../theme"
import { IconButtonPurple } from "../components/button/IconButtonPurple"
import { IconButtonPrimary } from "../components/button/IconButtonPrimary"
import { Caption } from "../components/text/Caption"
import { TextBody2 } from "../components/text/TextBody2"
import { MainLayout } from "../layouts/MainLayout"
import { AnalyticItem } from "../components/AnalyticItem"
import { Subtitle1 } from "../components/text/Subtitle1"
import useAsync from "../../common/hooks/useAsync"
import { useHabitAppApiClient } from "../hooks/useHabitApiClient"
import { ProfileStatisticType } from "../services/api/types/ProfileStatisticType"
import { GetProfileStatisticsReponse } from "../services/api/types/GetProfileStatisticsReponse"
import dayjs from "dayjs"
import { OptionItem } from "../components/OptionItem"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type TrackingForm = {
  type: ProfileStatisticType
}

export const Profile = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const links = useLinks()
  const api = useHabitAppApiClient()
  const { register, watch } = useForm<TrackingForm>({
    defaultValues: {
      type: ProfileStatisticType.LastSevenDays,
    },
  })
  const watchTypeTracking = watch("type")
  const getProfileStatistics = useAsync<GetProfileStatisticsReponse>((type: ProfileStatisticType) =>
    api.getProfileStatistics({ type })
  )
  const profileStatistics = getProfileStatistics.result

  useEffect(() => {
    getProfileStatistics.run(watchTypeTracking)
  }, [watchTypeTracking])

  return (
    <MainLayout
      title={t("habit.profile.title")}
      backLink={links.habit.home()}
      rightContent={
        <IconButtonPurple>
          <EditIcon />
        </IconButtonPurple>
      }
    >
      <Root>
        <Container>
          <CustomCard>
            <ProfileContainer>
              <UserContainer>
                <UserInfo>
                  <NewHabitImage />
                  <div>
                    <Caption>
                      {user!.firstName} {user!.lastName}
                    </Caption>
                    <TextBody2>{t("habit.profile.labels.name")}</TextBody2>
                  </div>
                </UserInfo>
                <NativeSelect {...register("type")} input={<InputBase />}>
                  <option value={ProfileStatisticType.LastSevenDays}>{t("habit.profile.labels.last7Days")}</option>
                </NativeSelect>
              </UserContainer>
              {profileStatistics && (
                <>
                  <AnalyticItem
                    value={profileStatistics.taskCompleted!}
                    label={t("habit.profile.labels.taskCompleted")}
                    icon={{ icon: <FlagIcon />, color: color.blue1Transparent2 }}
                    labelTop
                  />
                  <TrackingHabit>
                    {profileStatistics.items.map((tracking) => {
                      const [year, month, day] = tracking.date.split("-")
                      return (
                        <div>
                          <Box
                            color={
                              dayjs(new Date()).format("YYYY-MM-DD") === tracking.date
                                ? color.orange2
                                : tracking.completed === 0
                                ? color.red2
                                : color.purple1
                            }
                            position="relative"
                            display="inline-flex"
                          >
                            <CustomProgress isBackground />

                            <Box position="absolute">
                              <CustomProgress value={tracking.percent} />
                            </Box>
                            <Box
                              top={0}
                              left={0}
                              bottom={0}
                              right={0}
                              position="absolute"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Subtitle1>{tracking.completed}</Subtitle1>
                            </Box>
                          </Box>
                          <TextBody2>{`${month}/${day}`}</TextBody2>
                        </div>
                      )
                    })}
                  </TrackingHabit>
                </>
              )}
            </ProfileContainer>
          </CustomCard>
          <OptionItem icon={<CardIcon />} title={t("habit.profile.actions.billingMethods")} />
          <OptionItem
            icon={<MedalIcon />}
            title={t("habit.profile.actions.longestStreak")}
            endText={`${profileStatistics?.longestStreak} ${t(
              `habit.profile.labels.${profileStatistics?.longestStreak || 0 > 1 ? "days" : "day"}`
            )}`}
          />
        </Container>

        <IconButtonPrimary>
          <Add />
        </IconButtonPrimary>
      </Root>
    </MainLayout>
  )
}

const Root = styled.div`
  max-width: 414px;
  padding: 0 ${spacing.l};
  margin: auto;
  display: flex;
  gap: ${spacing.m};
  flex-direction: column;
  gap: 200px;
  align-items: center;
`
const CustomCard = styled(Card)`
  box-shadow: none;
  border-radius: 12px;
  width: 100%;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.m};
  margin-top: ${spacing.xl};
`
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div:nth-child(2) {
    border-top: 1px solid ${color.orange1};
    border-bottom: 1px solid ${color.orange1};
  }
`
const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${spacing.m};
  padding: ${spacing.m} ${spacing.l};
  ${TextBody2} {
    opacity: 0.5;
  }
  .MuiInputBase-root {
    flex-shrink: 0;
    display: flex;
    select {
      border: 1px solid ${color.purpleTransparent1};
      border-radius: 12px;
      padding: ${spacing.m};
      padding-right: 30px;
      font-family: "Manrope";
      font-size: 15px;
    }
    svg {
      top: unset;
      fill: ${color.purple1};
    }
  }
`
const UserInfo = styled.div`
  width: 100%;
  display: flex;
  gap: ${spacing.m};
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${Caption} {
      font-weight: 700;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      text-transform: capitalize;
    }
  }
`
const TrackingHabit = styled.div`
  padding: ${spacing.l};
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacing.m};
    ${Subtitle1} {
      color: currentColor;
    }
  }
`

const CustomProgress = styled(CircularProgress).attrs((props) => ({
  variant: "determinate",
  size: 40,
  thickness: 3,
  value: 100,
  ...props,
}))<{ isBackground?: boolean }>`
  color: currentColor;
  opacity: ${(props) => (props.isBackground ? 0.1 : 1)};
`
