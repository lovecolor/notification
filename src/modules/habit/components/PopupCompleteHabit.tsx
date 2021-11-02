import { Card } from "@material-ui/core"
import styled from "styled-components"
import { CloseIcon } from "../../../assets/icons"
import { HabitImage } from "../../../assets/images"
import { color, spacing } from "../../theme"
import { ButtonPrimary } from "./button/ButtonPrimary"
import { IconButtonPurple } from "./button/IconButtonPurple"
import { useTranslation } from "react-i18next"
import { BackDrop } from "../../common/components/BackDrop"
import { ButtonBase } from "./button/ButtonBase"
import Heading2 from "./text/Heading2"
import { Caption } from "./text/Caption"
import { useHistory } from "react-router"
import { useLinks } from "../../common/hooks/useLinks"

export type PopupCompleteHabitProps = {
  onClose: () => void
}

export const PopupCompleteHabit = (props: PopupCompleteHabitProps) => {
  const { t } = useTranslation()
  const history = useHistory()
  const links = useLinks()

  const handleAddNewHabit = () => {
    history.push(links.habit.newHabit())
  }

  return (
    <BackDrop onClose={props.onClose}>
      <CustomCard>
        <IconButtonPurple onClick={props.onClose}>
          <CloseIcon />
        </IconButtonPurple>
        <HabitImage />
        <Heading2>{t("habit.habitDetail.labels.congratulations")}</Heading2>
        <Caption>{t("habit.habitDetail.labels.popupDescription")}</Caption>
        <ButtonPrimary onClick={handleAddNewHabit}>{t("habit.habitDetail.actions.createNewHabit")}</ButtonPrimary>
        <CustomButton onClick={props.onClose}>{t("habit.habitDetail.actions.continue")}</CustomButton>
      </CustomCard>
    </BackDrop>
  )
}
const CustomButton = styled(ButtonBase)`
  background-color: ${color.orange1};
`
const CustomCard = styled(Card)`
  position: relative;
  border-radius: 20px;
  box-shadow: none;
  width: calc(414px - ${spacing.l} * 2);
  padding: ${spacing.l};
  margin-top: auto;
  margin-bottom: ${spacing.l};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.m};
  & > svg {
    width: 312px;
    height: 312px;
    rect {
      width: 100%;
      height: 100%;
    }
  }

  ${IconButtonPurple} {
    align-self: flex-end;
    width: 32px;
    height: 32px;
  }
  ${ButtonBase} {
    width: 100%;
    box-shadow: none;
  }
  ${Caption} {
    text-align: center;
    margin-bottom: ${spacing.l};
  }
`
