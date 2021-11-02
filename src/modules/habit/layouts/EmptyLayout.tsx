import styled from "styled-components"

export const EmptyLayout = (props: any) => {
  return <Layout>{props.children}</Layout>
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
