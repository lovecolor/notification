import styled from "styled-components"
import { Input } from "./Input"
import { spacing, color } from "../../../theme"

const InputWhite = styled(Input)`
  & .MuiInputBase-root {
    margin: 4px 0;
    background: ${color.white1};
    border: none;
    border-radius: 12px;
    width: 100%;
    color: ${color.purple1};
    &:focus-within {
      color: ${color.orange2};
      & svg {
        & path {
          stroke: ${color.orange2};
          fill: ${color.orange2};
        }
      }
    }
  }
  & .MuiInputBase-input {
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    padding: ${spacing.l} ${spacing.l};
  }
  & .MuiInput-underline {
    &:before {
      background-color: transparent;
      border-bottom: none;
    }
    &:after {
      border-bottom: none;
    }
  }
  & .MuiInput-underline {
    &:hover:not(.Mui-disabled):before {
      border-bottom: none;
    }
  }
  & .MuiInput-colorSecondary.MuiInput-underline {
    &:after {
      border-bottom: none;
    }
  }
`

export default InputWhite
