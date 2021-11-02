export const getAppConfig = () => {
  return {
    api: {
      habitEndpoint: process.env.REACT_APP_HABIT_API_ENDPOINT,
      authEndpoint: process.env.REACT_APP_AUTH_API_ENDPOINT,
    },
    firebase: {
      config: {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
      },
      reactAppValidKey: process.env.REACT_APP_VALID_KEY,
    },
  }
}
