import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lifeCycle } from './LifeLogical'

const Matrix = styled.div`
  width: ${({ matrixSizeW }) => matrixSizeW}px;
  height: ${({ matrixSizeH }) => matrixSizeH}px;
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
const LaunchLifeBtn = styled.button``

const propTypes = {
  squareSize: PropTypes.number,
  nbrSquareWidth: PropTypes.number,
  nbrSquareHeight: PropTypes.number,
  borderSize: PropTypes.number,
}

const defaultProps = {
  squareSize: 30,
  nbrSquareWidth: 10,
  nbrSquareHeight: 10,
  borderSize: 3,
}

const MatrixContainer = ({
  squareSize, nbrSquareWidth, nbrSquareHeight, borderSize,
}) => {
  const [matrix, setMatrix] = useState([])
  const [lifeCycleState, setLifeCycleState] = useState(`stoped`)

  useEffect(() => {
    if (matrix.length === 0) {
      const newMatrix = []
      let matrixX = 0
      let matrixY = 0

      while (matrixY < nbrSquareHeight) {
        newMatrix[matrixY] = []
        while (matrixX < nbrSquareWidth) {
          newMatrix[matrixY][matrixX] = 0
          matrixX++
        }
        matrixX = 0
        matrixY++
      }
      setMatrix(newMatrix)
    }
    console.log(matrix)
  }, [
    matrix,
  ])

  const enableSquare = (x, y) => () => setMatrix(oldMatrix => {
    oldMatrix[x][y] = oldMatrix[x][y] === 0 ? 1 : 0
    return [...oldMatrix]
  })

  const launchLifeCycle = () => {
    const newLyfeCycleState = lifeCycleState === `stoped` ? `started` : `stoped`
    setLifeCycleState(newLyfeCycleState)
    return lifeCycle(matrix, newLyfeCycleState, setMatrix)
  }
  console.log(
    matrix,
    lifeCycleState,
  )
  return (
    <>
      <Matrix
        matrixSizeH={(squareSize + (borderSize * 2)) * nbrSquareHeight}
        matrixSizeW={(squareSize + (borderSize * 2)) * nbrSquareWidth}
      >
        {
          matrix.map((e, i) => (
            <Line>
              {
                e.map((f, j) => (
                  <Square
                    borderSize={borderSize}
                    squareSize={squareSize}
                    isSelected={f === 1}
                    onClick={enableSquare(i, j)}
                  />
                ))
              }
            </Line>
          ))
        }
      </Matrix>
      <LaunchLifeBtn
        onClick={launchLifeCycle}
      >
        Launch Life
      </LaunchLifeBtn>
    </>
  )
}

MatrixContainer.propTypes = propTypes
MatrixContainer.defaultProps = defaultProps

export default MatrixContainer
