import { Link } from "react-router-dom"
import { ReactNode } from "react"
import styled from "styled-components"
import { BackIcon, MenuIcon } from "../../../assets/icons"
import { spacing } from "../../theme"
import { IconButtonPurple } from "../components/button/IconButtonPurple"
import { Heading3 } from "../components/text/Heading3"

// Layout for private pages
export type MainLayoutProps = {
  children: ReactNode
  title: string
  backLink?: string
  rightContent?: ReactNode
}
export const MainLayout = (props: MainLayoutProps) => {
  // Render:
  // Navbar, sidebars, ...
  return (
    <Layout>
      <Header>
        <Box>
          <IconButtonPurple>
            {props.backLink ? (
              <Link to={props.backLink}>
                <BackIcon />
              </Link>
            ) : (
              <MenuIcon />
            )}
          </IconButtonPurple>
        </Box>
        <CustomHeading3>{props.title}</CustomHeading3>
        <Box>{props.rightContent}</Box>
      </Header>
      {props.children}
    </Layout>
  )
}

const Header = styled.div`
  min-width: 414px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${spacing.l};
  padding-top: ${spacing.xl};
`
const Box = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  a {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const CustomHeading3 = styled(Heading3)`
  font-weight: 700;
  flex-grow: 1;
  text-align: center;
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
