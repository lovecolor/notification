import { SnackbarProvider } from "notistack"
import { StylesProvider, CssBaseline } from "@material-ui/core"
import { Switch } from "react-router"
import "./App.css"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./modules/theme"
import { AuthProvider } from "./modules/common/contexts/AuthProvider"
import { BrowserRouter } from "react-router-dom"
import { Routes } from "./routers/Routes"

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <AuthProvider>
              <BrowserRouter>
                <Switch>
                  <Routes />
                </Switch>
              </BrowserRouter>
            </AuthProvider>
          </CssBaseline>
        </ThemeProvider>
      </StylesProvider>
    </SnackbarProvider>
  )
}

export default App
