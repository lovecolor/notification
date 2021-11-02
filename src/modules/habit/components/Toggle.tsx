import { Switch } from "@material-ui/core"
import styled from "styled-components"
import { color } from "../../theme"

export const Toggle = styled(Switch)<{ label: string; checkLabel: string }>`
  width: 60px;
  height: 30px;
  padding: 0;
  align-items: center;
  .MuiSwitch-switchBase {
    padding: 0px;
    margin: 4px;
  }
  .Mui-checked {
    transform: translateX(30px);
    & + .MuiSwitch-track {
      background-color: ${color.orange2};
      opacity: 0.2;
    }
    .MuiSwitch-thumb {
      background-color: ${color.orange2};
      box-shadow: 2px 3px 6px rgba(253, 167, 88, 0.5);
    }
  }
  .MuiSwitch-track {
    border-radius: 15px;
    background-color: ${color.purple1};
    opacity: 0.1;
  }

  .MuiSwitch-thumb {
    width: 22px;
    height: 22px;
    background-color: ${color.purple1};
    position: relative;
    box-shadow: -2px 3px 6px rgba(87, 51, 83, 0.5);
    display: flex;
    align-items: center;
    &:before,
    :after {
      font-family: "Manrope";
      font-weight: 700;
      font-size: 10px;
      width: 20px;
    }
    &:before {
      content: "${(props) => props.checkLabel}";
      margin-left: -28px;
      color: ${color.orange2};
    }
    &:after {
      content: "${(props) => props.label}";
      margin-left: 35px;
      color: ${color.purple1};
    }
  }
`
