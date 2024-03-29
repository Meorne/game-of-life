import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #efeff0;
  overflow: hidden ;
  font-family: Arial, Helvetica, sans-serif;
}

`
export const Line = styled.div.attrs({ className: `Line` })`
  display: flex;
  flex-direction:row ;
`

export const Square = styled.div.attrs({ className: `Square` })`
  width: ${({ squareSize }) => squareSize}px;
  height: ${({ squareSize }) => squareSize}px;
  border: ${({ borderSize }) => borderSize}px solid #000;
  background-color: unset;

  &.isSelected {
    border-color: #47ff7e;
    background-color: #000;
  }

  &.isUnscoped {
    border-color: #ff5347;
    background-color: #000;
  }
`

export const Btn = styled.div.attrs({ className: `Btn` })`
  display: inline-block;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 5px ;
  margin: 0 5px ;
  transition: background .5s;

  & > *{
    display:inline;
    vertical-align: bottom;
  }

  &:hover{
    cursor: pointer;
    background: #ccc;
  }

  &.icon{
    padding: 0 5px;
    font-size: 20px;
  }
`

export default GlobalStyles
