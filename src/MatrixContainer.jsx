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
  display:flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const ActionsContainer = styled.div`
  position:absolute;
  bottom:0 ;
  left:0 ;
  padding:25px;
  background:#fff;
  display:flex;
`

const propTypes = {
}

const defaultProps = {
}

const MatrixContainer = () => {
  const { lifeCycleState, setLifeCycleState } = useContext(lifeCycleContext)
  const { currentMatrix, setMatrix } = useContext(matrixContext)
  const { currentTemplate, setTemplate } = useContext(templateContext)
  const { params: { squareSize, speed, borderSize } } = useContext(paramsContext)

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
            <Line key={`line-${i}`}>
              {e.map((f, j) => {
                let className = ``
                if (f === 1) {
                  className = `isSelected`
                } else if (f === `unscoped`) {
                  className = `isUnscoped`
                }
                return (
                  <Square
                    key={`square-${j}`}
                    className={className}
                    squareSize={squareSize}
                    borderSize={borderSize}
                    onClick={enableSquare(i, j)}
                  />
                )
              })}
            </Line>
          ))}
      </Matrix>
      <ActionsContainer>
        <Btn
          onClick={launchLifeCycle}
          className="icon"
        >
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
