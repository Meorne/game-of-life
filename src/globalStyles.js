import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #efeff0;
  overflow: hidden;
}
`
const Line = styled.div`
  display: flex;
`

const Square = styled.div`
  display: inline-flex;
  width: ${({ squareSize }) => squareSize}px;
  height: ${({ squareSize }) => squareSize}px;
  border: ${({ borderSize }) => borderSize}px solid ${({ isSelected }) => (isSelected ? `#00ff37` : `#000`)};
  background-color: ${({ isSelected }) => (isSelected ? `#000` : `unset`)};
`

export {
  Line,
  Square,
}
export default GlobalStyles
