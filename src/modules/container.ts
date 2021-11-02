import { createAdminApiClient } from "./admin/services/api/createAdminApiClient"
import { getAppConfig } from "./config"
import { createHabitApiClient } from "./habit/services/api/createHabitApiClient"
import { getAppLinks } from "./links"
import { createApiClient } from "./common/services/api/createApiClient"
import languagedetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import en from "../locales/en.json"
import i18next from "i18next"
import { createAuthApiClient } from "./common/services/api/createAuthApiClient"
import { initializeApp } from "firebase/app"

const translator = i18next
  .createInstance({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
    },
    debug: true,
  })
  .use(initReactI18next)
  .use(languagedetector)
  .init()

const config = getAppConfig()
const links = getAppLinks()
const adminApiClient = createAdminApiClient(createApiClient({ baseURL: config.api.habitEndpoint }))
const habitApiClient = createHabitApiClient(createApiClient({ baseURL: config.api.habitEndpoint }))
const authApiClient = createAuthApiClient(createApiClient({ baseURL: config.api.habitEndpoint }))
const firebase = initializeApp(config.firebase.config)

export const getAppContainer = () => ({
  translator,
  config,
  links,
  adminApiClient,
  habitApiClient,
  authApiClient,
  firebase,
})
