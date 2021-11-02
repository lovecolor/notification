import { useState } from "react"
import styled from "styled-components"
import { GoogleIcon } from "../../../assets/icons"
import background from "../../../assets/images/background-login.svg"
import { spacing } from "../../theme"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Card from "@material-ui/core/Card"
import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { Heading1 } from "../components/text/Heading1"
import { Caption } from "../components/text/Caption"
import { Subtitle1 } from "../components/text/Subtitle1"
import { ButtonPrimary } from "../components/button/ButtonPrimary"
import { TextUnderline } from "../components/text/TextUnderline"
import { InputOrange } from "../../common/components/textField/InputOrange"
import { useTranslation } from "react-i18next"
import { color } from "../../theme"
import { ButtonText } from "../components/button/ButtonText"
import { ButtonWhite } from "../components/button/ButtonWhite"
import { ButtonLink } from "../components/button/ButtonLink"
import useAsync from "../../common/hooks/useAsync"
import { useAuthApiClient } from "../../common/hooks/useAuthApiClient"
import { useAuth } from "../../common/contexts/AuthProvider"
import { TextError } from "../components/text/TextError"
import { useLinks } from "../../common/hooks/useLinks"
import { useHistory } from "react-router"
import { SpinnerPrimary } from "../components/SpinnerPrimary"
import { useSnackbar } from "notistack"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { Facebook } from "../components/icons/Facebook"
import { regexEmail } from "./SignUp"

type FormInputs = {
  email: string
  password: string
}

export const Login = () => {
  const { enqueueSnackbar } = useSnackbar()
  const links = useLinks()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const { t } = useTranslation()
  const { setUser } = useAuth()
  const api = useAuthApiClient()

  const handleChangeShowPassword = () => setIsShowPassword(!isShowPassword)

  const login = useAsync(async (data) => {
    const result = await api.login(data)

    if (!result) return
    const { accessToken } = result
    localStorage.setItem("token", accessToken)

    history.push(links.habit.home())
    enqueueSnackbar(t("habit.login.messages.loginSuccess"), { variant: "success" })
  })
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    login.run(data)
  }

  return (
    <EmptyLayout>
      <Root>
        <Wrapper>
          <CustomHeading1>{t("habit.login.title")}</CustomHeading1>

          <CustomButtonWhite>
            <div>
              <GoogleIcon />
              {t("habit.login.actions.loginWithGoogle")}
            </div>
          </CustomButtonWhite>

          <CustomButtonWhite>
            <div>
              <Facebook />
              {t("habit.login.actions.loginWithFacebook")}
            </div>
          </CustomButtonWhite>
          <CustomCard>
            <FormTitle>{t("habit.login.labels.formTitle")}</FormTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputOrange
                {...register("email", {
                  required: { value: true, message: t("habit.login.messages.emailIsRequired") },
                  pattern: { value: regexEmail, message: t("habit.login.messages.emailIsInvalid") },
                })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
                startIcon={<MailIcon />}
                placeholder={t("habit.login.labels.email")}
              />

              <InputOrange
                type={isShowPassword ? "text" : "password"}
                {...register("password", {
                  required: { value: true, message: t("habit.login.messages.passwordIsRequired") },
                })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                startIcon={<LockIcon />}
                endIcon={
                  <ButtonText onClick={handleChangeShowPassword}>
                    <TextUnderline variant="subtitle1" color="secondary" lineColor="rgba(87, 51, 83, 0.5)" height={2}>
                      {t(isShowPassword ? "habit.login.actions.hide" : "habit.login.actions.show")}
                    </TextUnderline>
                  </ButtonText>
                }
                placeholder={t("habit.login.labels.password")}
              />

              {login.loading ? (
                <SpinnerPrimary />
              ) : (
                <LoginButton type="submit">{t("habit.login.actions.login")}</LoginButton>
              )}

              <CustomLink to={links.habit.forgotPassword()}>
                <TextUnderline variant="subtitle1" color="secondary" height={1}>
                  {t("habit.login.actions.forgotPassword")}
                </TextUnderline>
              </CustomLink>
              <FlexRow>
                <Subtitle1>{t("habit.login.labels.dontHaveAccount")} </Subtitle1>

                <ButtonLink link={links.habit.signUp()}> {t("habit.login.actions.signUp")}</ButtonLink>
              </FlexRow>
            </Form>
          </CustomCard>
        </Wrapper>
      </Root>
    </EmptyLayout>
  )
}
const Root = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
  margin: auto;
  max-width: 414px;
  background-image: url(${background});
  background-repeat: no-repeat;
`
const CustomHeading1 = styled(Heading1)`
  text-align: center;
  font-weight: 700;
  margin-bottom: ${spacing.xl};
`

const CustomButtonWhite = styled(ButtonWhite)`
  margin-bottom: ${spacing.m};
  justify-content: flex-start;
  box-shadow: none;
  div {
    margin: auto;
    display: flex;
    align-items: center;
    width: 75%;
    min-width: 250px;
    svg {
      display: flex;
      justify-content: flex-start;
      margin-right: ${spacing.lx};
    }
  }
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${spacing.xl};
  padding: ${spacing.l};
  margin-top: ${spacing.m};
  border-top: 1px solid ${color.orange1};
`

const FormTitle = styled(Caption)`
  width: 100%;
  text-align: center;
`

const LoginButton = styled(ButtonPrimary)`
  margin: ${spacing.l} 0;
  width: 100%;
  padding: ${spacing.l} 0;
  box-shadow: none;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`

const FlexRow = styled.div`
  display: flex;
`
const CustomCard = styled(Card)`
  border-radius: 20px;
  width: 100%;
  margin-top: ${spacing.lx};
  text-align: center;
  padding-top: ${spacing.m};
  box-shadow: none;
`

const LockIcon = styled(LockOutlinedIcon)`
  font-size: 20px;
  opacity: 0.5;
`

const MailIcon = styled(MailOutlineIcon)`
  font-size: 20px;
  opacity: 0.5;
`
