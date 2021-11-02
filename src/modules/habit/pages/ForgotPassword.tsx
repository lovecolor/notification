import { Link, useHistory } from "react-router-dom"
import styled from "styled-components"
import { BackIcon } from "../../../assets/icons"
import { useLinks } from "../../common/hooks/useLinks"
import { color, spacing } from "../../theme"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { IconButtonPurple } from "../components/button/IconButtonPurple"
import Heading2 from "../components/text/Heading2"
import { useTranslation } from "react-i18next"
import { ForgotPasswordImage } from "../../../assets/images"
import { Card } from "@material-ui/core"
import { Subtitle1 } from "../components/text/Subtitle1"
import { InputOrange } from "../../common/components/textField/InputOrange"
import { ButtonPrimary } from "../components/button/ButtonPrimary"
import { ButtonLink } from "../components/button/ButtonLink"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSnackbar } from "notistack"
import { useAuthApiClient } from "../../common/hooks/useAuthApiClient"
import useAsync from "../../common/hooks/useAsync"
import { SpinnerPrimary } from "../components/SpinnerPrimary"
import { TextError } from "../components/text/TextError"
import { regexEmail } from "./SignUp"

type ResetPasswordForm = {
  email: string
}
export const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>()
  const api = useAuthApiClient()
  const links = useLinks()
  const { t } = useTranslation()
  const history = useHistory()

  const requestResetPassword = useAsync(async (data) => {
    const result = await api.requestResetPassword(data)
    if (!result) return

    history.push(links.habit.changePassword())
    enqueueSnackbar(t("habit.forgotPassword.messages.requestResetPasswordSuccess"), { variant: "success" })
  })

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    requestResetPassword.run(data)
  }

  return (
    <EmptyLayout>
      <Root>
        <Wrapper>
          <Link to={links.habit.login()}>
            <IconButtonPurple>
              <BackIcon />
            </IconButtonPurple>
          </Link>
          <Container>
            <CustomHeading2>{t("habit.forgotPassword.title")}</CustomHeading2>
            <ForgotPasswordImage />
            <CustomCard>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Subtitle1>{t("habit.forgotPassword.labels.formTitle")}</Subtitle1>
                <CustomInputOrange
                  {...register("email", {
                    required: { value: true, message: t("habit.forgotPassword.messages.emailIsRequired") },
                    pattern: { value: regexEmail, message: t("habit.forgotPassword.messages.emailIsInvalid") },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  placeholder={t("habit.forgotPassword.labels.email")}
                />
                {requestResetPassword.error && <TextError>{requestResetPassword.error}</TextError>} 

                {requestResetPassword.loading ? (
                  <SpinnerPrimary />
                ) : (
                  <CustomButtonPrimary type="submit">
                    {t("habit.forgotPassword.actions.sendResetLink")}
                  </CustomButtonPrimary>
                )}
              </Form>
            </CustomCard>
            <Footer>
              <Subtitle1>{t("habit.forgotPassword.labels.rememberPassword")}</Subtitle1>
              <ButtonLink link={links.habit.login()}>{t("habit.forgotPassword.actions.login")}</ButtonLink>
            </Footer>
          </Container>
        </Wrapper>
      </Root>
    </EmptyLayout>
  )
}
const Root = styled.div`
  width: 100%;
  color: ${color.purple1};
`
const Wrapper = styled.div`
  max-width: 414px;
  margin: auto;
  padding: ${spacing.xl} ${spacing.l};
`
const Container = styled.div`
  padding-top: ${spacing.xl};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CustomHeading2 = styled(Heading2)`
  font-weight: 400;
  margin-bottom: ${spacing.xl};
`
const CustomCard = styled(Card)`
  box-shadow: none;
  border-radius: 12px;
  margin-top: ${spacing.xl};
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${spacing.l};
  ${Subtitle1} {
    width: 90%;
  }
`
const CustomInputOrange = styled(InputOrange)`
  margin-top: ${spacing.xl};
  div {
    input {
      margin: 0;
    }
  }
`
const CustomButtonPrimary = styled(ButtonPrimary)`
  width: 100%;
`
const Footer = styled.footer`
  display: flex;
  margin-top: ${spacing.xl};
`
