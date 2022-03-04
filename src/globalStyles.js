import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #efeff0;
}
`
const Line = styled.div`
  display: flex;
`

const Square = styled.div`
  display: inline-flex;
  width: ${({ squareSize }) => squareSize}px;
  height: ${({ squareSize }) => squareSize}px;
  border: ${({ borderSize }) => borderSize}px solid #000;
  background-color: unset;

  &.isSelected {
    border-color: #47ff7e;
    background-color: #000;
  }
`

export {
  Line,
  Square,
}
export default GlobalStyles
