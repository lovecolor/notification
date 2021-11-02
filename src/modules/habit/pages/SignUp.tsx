import { Checkbox, FormGroup, Typography, FormControlLabel } from "@material-ui/core"
import styled from "styled-components"
import { CreateAccountImage } from "../../../assets/images"
import { GoogleIcon, UserIcon, EmailIcon, PasswordIcon } from "../../../assets/icons"
import { EmptyLayout } from "../layouts/EmptyLayout"
import InputWhite from "../components/input/InputWhite"
import { useState } from "react"
import Link from "../components/link/Link"
import { SubmitHandler, useForm } from "react-hook-form"
import Heading2 from "../components/text/Heading2"
import { useTranslation } from "react-i18next"
import { spacing, color } from "../../theme"
import { Facebook } from "../components/icons/Facebook"
import { ButtonPrimary } from "../components/button/ButtonPrimary"
import { SignUpRequest } from "../../common/services/api/createAuthApiClient"
import useAsync from "../../common/hooks/useAsync"
import { useAuthApiClient } from "../../common/hooks/useAuthApiClient"
import { useHistory } from "react-router"
import { useLinks } from "../../common/hooks/useLinks"
import { useSnackbar } from "notistack"
import { ButtonWhite } from "../components/button/ButtonWhite"
import { Subtitle1 } from "../components/text/Subtitle1"
import { ButtonBase } from "../components/button/ButtonBase"
import { TextError } from "../components/text/TextError"

export const regexEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
type SignUpForm = {
  email: string
  password: string
  lastName: string
  firstName: string
}

export const SignUp = () => {
  const history = useHistory()
  const link = useLinks().habit
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>()

  const { t } = useTranslation()

  const api = useAuthApiClient()
  const { enqueueSnackbar } = useSnackbar()

  const signUp = useAsync(async (data: SignUpRequest) => {
    const response = await api.signUp(data)
    if (!response) return
    enqueueSnackbar(t("habit.signUp.messages.signUpSuccess"), { variant: "success" })
    history.push(link.login())
    reset()
  })

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    signUp.run(data)
  }

  return (
    <EmptyLayout>
      <Wrapper>
        <ImageContainer>
          <CreateAccountImage />
        </ImageContainer>
        <CreateAccountText>{t("habit.signUp.title")}</CreateAccountText>
        <form onSubmit={handleSubmit((data: SignUpForm) => onSubmit(data))}>
          <FormContainer>
            <InputWhite
              {...register("firstName", {
                required: { value: true, message: t("habit.signUp.messages.firstNameIsRequired") },
              })}
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              start={<CustomUserIcon />}
              placeholder={t("habit.signUp.labels.firstName")}
            />

            <InputWhite
              {...register("lastName", {
                required: { value: true, message: t("habit.signUp.messages.lastNameIsRequired") },
              })}
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              start={<CustomUserIcon />}
              placeholder={t("habit.signUp.labels.lastName")}
            />

            <InputWhite
              {...register("email", {
                required: { value: true, message: t("habit.signUp.messages.emailIsRequired") },
                pattern: { value: regexEmail, message: t("habit.signUp.messages.emailIsInvalid") },
              })}
              error={!!errors.email}
              helperText={errors?.email?.message}
              start={<CustomEmailIcon />}
              placeholder={t("habit.signUp.labels.email")}
            />

            <InputWhite
              {...register("password", {
                required: { value: true, message: t("habit.signUp.messages.passwordIsRequired") },
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
              start={<CustomPasswordIcon />}
              placeholder={t("habit.signUp.labels.passWord")}
              type={showPassword ? "text" : "password"}
              inputProps={{ minLength: 6 }}
              end={
                <ShowPasswordButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? t("habit.signUp.actions.hide") : t("habit.signUp.actions.show")}
                </ShowPasswordButton>
              }
            />

            <FormControlLabel
              control={<CustomCheckbox />}
              label={<Subtitle1>{t("habit.signUp.labels.keepMeSignIn")}</Subtitle1>}
            />

            <FormControlLabel
              control={<CustomCheckbox />}
              label={<Subtitle1>{t("habit.signUp.labels.notifyEmail")}</Subtitle1>}
            />
            {signUp.error && <TextError>{signUp.error}</TextError>}

            <OrangeButton type="submit">{t("habit.signUp.actions.createAccount")}</OrangeButton>
            <HorizonContainer>
              <hr />
              <Subtitle1>{t("habit.signUp.labels.signInWith")}</Subtitle1>
            </HorizonContainer>
            <OrtherSignInContainer>
              <ButtonWhite>
                <GoogleIcon /> Google
              </ButtonWhite>
              <ButtonWhite>
                <Facebook /> Facebook
              </ButtonWhite>
            </OrtherSignInContainer>
            <SignInText>
              <Subtitle1> {t("habit.signUp.labels.alreadyHaveAccount")}</Subtitle1>
              <Link to={link.login()}>
                <Subtitle1>{t("habit.signUp.actions.signIn")}</Subtitle1>
              </Link>
            </SignInText>
          </FormContainer>
        </form>
      </Wrapper>
    </EmptyLayout>
  )
}

const ShowPasswordButton = styled(ButtonBase)`
  font-size: 14px;
  text-decoration-line: underline;
  color: ${color.purple1};
  background: none;
  box-shadow: none;
  &:hover,
  :active {
    box-shadow: none;
    background: none;
  }
  .MuiTouchRipple-root {
    display: none;
  }
`

const CustomUserIcon = styled(UserIcon)`
  & path {
    stroke: ${color.purple1};
    fill: none !important;
  }
`
const CustomEmailIcon = styled(EmailIcon)`
  & path {
    stroke: ${color.purple1};
    fill: ${color.purple1};
  }
`
const CustomPasswordIcon = styled(PasswordIcon)`
  & path {
    stroke: ${color.purple1};
    fill: ${color.purple1};
  }
`

const SignInText = styled(Typography)`
  margin: ${spacing.xl} 0;
  font-weight: 700;
  display: flex;
  justify-content: center;
  gap: ${spacing.xs};
  ${Link} {
    ${Subtitle1} {
      font-weight: 700;
    }
  }
`

const OrangeButton = styled(ButtonPrimary)`
  margin-top: ${spacing.l};
  box-shadow: none;
`

const OrtherSignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing.m};
  ${ButtonWhite} {
    box-shadow: none;
    span {
      gap: ${spacing.l};
    }
  }
`

const HorizonContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: ${spacing.l} 0;
  hr {
    width: 100%;
    height: 2px;
    color: ${color.purple1};
    opacity: 0.2;
  }
  ${Subtitle1} {
    opacity: 0.5;
    position: absolute;
    padding: ${spacing.m};
    background-color: ${color.orange1};
  }
`

const CustomCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    height: 22px;
    fill: ${color.orange2};
  }
  &.MuiCheckbox-colorSecondary.Mui-checked:hover {
    fill: ${color.purple1};
  }
`

const FormContainer = styled(FormGroup)`
  margin: 0 ${spacing.lx};
  text-align: center;
`

const CreateAccountText = styled(Heading2)`
  font-size: 24px;
  text-transform: uppercase;
  margin: ${spacing.xl} 0;
`

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
