import { Button, FormGroup, Paper, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { color, spacing } from "../../theme"
import Heading2 from "../components/text/Heading2"
import KeyboardBackspaceRounded from "@material-ui/icons/KeyboardBackspaceRounded"
import { useTranslation } from "react-i18next"
import { IconButtonPurple } from "../components/button/IconButtonPurple"
import { ForgotPasswordImage } from "../../../assets/images"
import { ButtonPrimary } from "../components/button/ButtonPrimary"
import Link from "../components/link/Link"
import { useLinks } from "../../common/hooks/useLinks"
import { InputOrange } from "../../common/components/textField/InputOrange"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import useAsync from "../../common/hooks/useAsync"
import { useAuthApiClient } from "../../common/hooks/useAuthApiClient"
import { ChangePasswordRequest } from "../../common/services/api/createAuthApiClient"
import { useSnackbar } from "notistack"
import { useHistory } from "react-router"
import { TextError } from "../components/text/TextError"
import { regexEmail } from "./SignUp"

type ChangePasswordForm = {
  email: string
  password: string
  code: string
}

export const ChangePassword = () => {
  const api = useAuthApiClient()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>()
  const { t } = useTranslation()
  const link = useLinks()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const changePassword = useAsync(async (data: ChangePasswordRequest) => {
    const response = await api.changePassword(data)
    if (!response) return
    reset()
    enqueueSnackbar(t("habit.changePassword.messages.changePasswordSuccess"), { variant: "success" })
    history.push(link.habit.login())
  })
  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    changePassword.run(data)
  }

  return (
    <EmptyLayout>
      <Wrapper>
        <Container>
          <GoBackIconButton onClick={() => history.push(link.habit.forgotPassword())}>
            <GoBackIcon />
          </GoBackIconButton>
          <ChangePasswordText>{t("habit.changePassword.title")}</ChangePasswordText>
          <ImageContainer>
            <ForgotPasswordImage />
          </ImageContainer>
          <FormContainer>
            <form onSubmit={handleSubmit((data: ChangePasswordForm) => onSubmit(data))}>
              <FormControl>
                <ChangePasswordDescription>{t("habit.changePassword.labels.description")}</ChangePasswordDescription>
                <Input
                  {...register("email", {
                    required: { value: true, message: t("habit.changePassword.messages.emailIsRequired") },
                    pattern: { value: regexEmail, message: t("habit.changePassword.messages.emailIsInvalid") },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  placeholder={t("habit.changePassword.labels.email")}
                />
                <Input
                  {...register("code", {
                    required: { value: true, message: t("habit.changePassword.messages.codeIsRequired") },
                  })}
                  error={!!errors?.code}
                  helperText={errors?.code?.message}
                  placeholder={t("habit.changePassword.labels.code")}
                />
                <Input
                  {...register("password", {
                    required: { value: true, message: t("habit.changePassword.messages.passwordIsRequired") },
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                  type={showNewPassword ? "text" : "password"}
                  endIcon={
                    <ShowPasswordButton onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword
                        ? t("habit.changePassword.actions.hide")
                        : t("habit.changePassword.actions.show")}
                    </ShowPasswordButton>
                  }
                  placeholder={t("habit.changePassword.labels.newPassword")}
                />{" "}
                {changePassword.error && <TextError>{changePassword.error}</TextError>}
                <ButtonPrimary type="submit">{t("habit.changePassword.actions.changePassword")}</ButtonPrimary>
              </FormControl>
            </form>
          </FormContainer>
          <RememberPasswordText variant="subtitle1">
            {t("habit.changePassword.labels.rememberPassword")}
            <Link to={link.habit.login()}>{t("habit.changePassword.actions.login")}</Link>
          </RememberPasswordText>
        </Container>
      </Wrapper>
    </EmptyLayout>
  )
}

const ShowPasswordButton = styled(Button)`
  font-size: 14px;
  text-decoration-line: underline;
  text-transform: none;
  color: ${color.purple1};
`

const Input = styled(InputOrange)`
  width: 100%;
`

const FormControl = styled(FormGroup)`
  max-width: 334px;
  margin-left: ${spacing.l};
  padding: ${spacing.s};
`

const ChangePasswordDescription = styled(Typography)`
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  max-width: 326px;
  margin-bottom: ${spacing.xl};
`

const FormContainer = styled(Paper)`
  box-shadow: none;
  max-width: 374px;
  border-radius: 12px;
  margin-left: ${spacing.l};
  padding: ${spacing.lx} 0;
  margin-bottom: ${spacing.xxl};
`
const RememberPasswordText = styled(Typography)`
  line-height: 22px;
  text-align: center;
  margin: ${spacing.xl} 0;
`

const Wrapper = styled.div`
  max-width: 414px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${spacing.s};
`

const ChangePasswordText = styled(Heading2)`
  text-transform: uppercase;
  margin: ${spacing.xl} 0;
  text-align: center;
`

const ImageContainer = styled.div`
  margin: 0 ${spacing.xxl};
  margin-bottom: ${spacing.xl};
`

const GoBackIcon = styled(KeyboardBackspaceRounded)`
  font-size: 30px;
  color: ${color.purple1};
`

const GoBackIconButton = styled(IconButtonPurple)`
  max-width: 44px;
  max-height: 44px;
  margin-left: ${spacing.l};
  margin-top: ${spacing.xl};
`
