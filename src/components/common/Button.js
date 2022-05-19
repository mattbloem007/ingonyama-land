import styled from "styled-components"

export const Button = styled.button`
  padding: 8px 16px;
  background: rebeccapurple;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  ${props => (props.block ? "display: block; width: 100%;" : "")}

  &:hover {
    background: indigo;
  }
`

export const GoogleButton = styled.button`
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  ${props => (props.block ? "display: block; width: 100%;" : "")}

  &:hover {
    background: indigo;
  }
`

export const ResetDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
`

export const ResetContainer = styled.div`
display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
`

export const ResetTextBox = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`
export const ResetBtn = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`
