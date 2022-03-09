import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import cloneDeep from 'lodash/cloneDeep'
// import PropTypes from 'prop-types'
import { BsStopBtn, BsPlayBtn } from "react-icons/bs"
import { lifeCycle } from './LifeLogical'
import loader from './img/1495.gif'

import {
  matrixContext, paramsContext, templateContext, lifeCycleContext,
} from './context'
import { Line, Square, Btn } from './globalStyles'

const Matrix = styled.div`

`
const ActionsContainer = styled.div`
  position:absolute;
  bottom:0 ;
  left:0 ;
  padding:25px ;
  background:#fff ;
`

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
        {lifeCycleState === `pending`
          ? <img src={loader} alt="" />
          : currentMatrix.map((e, i) => (
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
      <ActionsContainer>
        <Btn onClick={launchLifeCycle}>
          {lifeCycleState === `stoped`
            ? <BsPlayBtn />
            : <BsStopBtn />}
        </Btn>
        <Btn onClick={resetGame}> Reset </Btn>
      </ActionsContainer>
    </>
  )
}

MatrixContainer.propTypes = propTypes
MatrixContainer.defaultProps = defaultProps

export default MatrixContainer
