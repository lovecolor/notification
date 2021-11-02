import styled from "styled-components"
import { TypographyBase } from "./TypographyBase"

export const TextUnderline = styled(TypographyBase)<{ lineColor?: string; height: number }>`
  text-decoration: underline;
  text-decoration-color: ${(props) => props.lineColor || props.color};
  text-decoration-thickness: ${(props) => props.height}px;
  cursor: pointer;
`
