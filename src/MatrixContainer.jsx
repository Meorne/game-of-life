import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import cloneDeep from 'lodash/cloneDeep'
// import PropTypes from 'prop-types'
import { lifeCycle } from './LifeLogical'
import { matrixContext, paramsContext, templateContext } from './context'
import { Line, Square } from './globalStyles'

const Matrix = styled.div`
  width: ${({ matrixSizeW }) => matrixSizeW}px;
  height: ${({ matrixSizeH }) => matrixSizeH}px;
  `

const Btn = styled.button``

const propTypes = {
}

const defaultProps = {
}

const MatrixContainer = () => {
  const [lifeCycleState, setLifeCycleState] = useState(`stoped`)
  const { currentMatrix, setMatrix } = useContext(matrixContext)
  const { currentTemplate } = useContext(templateContext)
  const { params: { squareSize, nbrSquare, borderSize } } = useContext(paramsContext)

  useEffect(() => {
    setMatrix(cloneDeep(currentTemplate))
  }, [currentTemplate])

  useEffect(() => {
    lifeCycle(currentMatrix, lifeCycleState, undefined, setMatrix)
  }, [
    currentMatrix,
    lifeCycleState,
  ])

  const enableSquare = (x, y) => () => setMatrix(oldMatrix => {
    if (lifeCycleState === `stoped`) {
      oldMatrix[x][y] = oldMatrix[x][y] === 0 ? 1 : 0
    }
    return [...oldMatrix]
  })

  const launchLifeCycle = () => {
    setLifeCycleState(lifeCycleState === `stoped` ? `started` : `stoped`)
  }

  const resetGame = () => {
    console.log(currentTemplate)
    setMatrix(currentTemplate)
    setLifeCycleState(`stoped`)
  }

  return (
    <>
      <Matrix
        matrixSizeH={(squareSize + (borderSize * 2)) * nbrSquare}
        matrixSizeW={(squareSize + (borderSize * 2)) * nbrSquare}
      >
        {
          currentMatrix.map((e, i) => (
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
      <Btn
        onClick={launchLifeCycle}
      >
        {`Launch Life : ${lifeCycleState}`}
      </Btn>
      <Btn onClick={resetGame}>  Reset </Btn>
    </>
  )
}

MatrixContainer.propTypes = propTypes
MatrixContainer.defaultProps = defaultProps

export default MatrixContainer
