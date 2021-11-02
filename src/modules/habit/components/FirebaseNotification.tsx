import { useEffect } from "react"
import { getMessaging } from "firebase/messaging"
import { getToken, onMessage } from "firebase/messaging"
import { useFirebase } from "../hooks/useFirebase"
import { useSnackbar } from "notistack"
import { useConfig } from "../../common/hooks/useConfig"

export const FirebaseNotification = () => {
  const { enqueueSnackbar } = useSnackbar()
  const config = useConfig()
  const firebase = useFirebase()
  const messaging = getMessaging(firebase)
  const getMessageToken = async () => {
    const token = await getToken(messaging, {
      vapidKey: config.firebase.reactAppValidKey,
    })
    console.log("🚀 ~ file: FirebaseNotification.tsx ~ line 17 ~ getMessageToken ~ token", token)
  }

  useEffect(() => {
    getMessageToken()
    const unsubscribeMessage = onMessage(messaging, (payload) => {
      enqueueSnackbar(payload.notification?.body, { variant: "info" })
    })
    return unsubscribeMessage
  }, [])

  return <></>
}
