import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import cloneDeep from 'lodash/cloneDeep'
// import PropTypes from 'prop-types'
import { lifeCycle } from './LifeLogical'
import {
  matrixContext, paramsContext, templateContext, lifeCycleContext,
} from './context'
import { Line, Square } from './globalStyles'

const Matrix = styled.div``

const Btn = styled.button``

const propTypes = {
}

const defaultProps = {
}

const MatrixContainer = () => {
  const { lifeCycleState, setLifeCycleState } = useContext(lifeCycleContext)
  const { currentMatrix, setMatrix } = useContext(matrixContext)
  const { currentTemplate, setTemplate } = useContext(templateContext)
  const { params: { squareSize, borderSize, speed } } = useContext(paramsContext)

  useEffect(() => {
    setMatrix(cloneDeep(currentTemplate))
  }, [currentTemplate])

  useEffect(() => {
    lifeCycle(currentMatrix, lifeCycleState, (2000 / speed), setMatrix)
    window.currentMatrix = currentMatrix
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
    setTemplate([])
    setLifeCycleState(`stoped`)
  }

  return (
    <>
      <Matrix>
        {currentMatrix.map((e, i) => (
          <Line>
            {e.map((f, j) => (
              <Square
                className={f === 1 ? `isSelected` : ``}
                borderSize={borderSize}
                squareSize={squareSize}
                onClick={enableSquare(i, j)}
              />
            ))}
          </Line>
        ))}
      </Matrix>
      <Btn onClick={launchLifeCycle}>
        {`Launch Life : ${lifeCycleState}`}
      </Btn>
      <Btn onClick={resetGame}> Reset </Btn>
    </>
  )
}

MatrixContainer.propTypes = propTypes
MatrixContainer.defaultProps = defaultProps

export default MatrixContainer
