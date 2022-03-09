import React, { useContext, useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import styled from 'styled-components'

import { templateContext, paramsContext, lifeCycleContext } from '../context'
import { Line, Square } from '../globalStyles'
import * as tmplList from '../templateList'

const TemplateWrapper = styled.div`
  display: flex;
`
const Template = styled.div`
  margin: 10px;
`

const TemplateContainer = () => {
  const { currentTemplate, setTemplate } = useContext(templateContext)
  const { setLifeCycleState } = useContext(lifeCycleContext)
  // const { currentMatrix } = useContext(matrixContext)
  const { params: { borderSize, squareSize } } = useContext(paramsContext)

  const defaultMatrix = () => {
    setLifeCycleState(`pending`)

    const calculSquareBase = squareSize + (borderSize * 2)
    const nbrSquareH = Math.floor(window.innerHeight / calculSquareBase)
    const nbrSquareW = Math.floor(window.innerWidth / calculSquareBase)

    const newMatrix = []
    let matrixX = 0
    let matrixY = 0

    while (matrixY < nbrSquareH) {
      newMatrix[matrixY] = []
      while (matrixX < nbrSquareW) {
        newMatrix[matrixY][matrixX] = 0
        matrixX++
      }
      matrixX = 0
      matrixY++
    }
    setLifeCycleState(`stoped`)

    return newMatrix
  }

  const drawTmplInCurrentMatrix = tmpl => () => {
    setLifeCycleState(`stoped`)
    const newMatrix = cloneDeep(defaultMatrix())

    const yCmL = newMatrix.length
    const xCmL = newMatrix[0].length

    const yTmplL = tmpl.length
    const xTmplL = tmpl[0].length

    const middleTmplY = Math.floor(yTmplL / 2)
    const middleTmplX = Math.floor(xTmplL / 2)

    const middleYCl = Math.floor(yCmL / 2)
    const middleXCl = Math.floor(xCmL / 2)

    if (yCmL > yTmplL && xCmL > xTmplL) {
      const startY = middleYCl - middleTmplY
      const startX = middleXCl - middleTmplX
      tmpl.forEach((e, i) => {
        e.forEach((f, j) => {
          newMatrix[i + startY][j + startX] = f
        })
      })
      return setTemplate(newMatrix)
    }
    return setTemplate(tmpl)
  }

  useEffect(() => {
    if (currentTemplate.length === 0) setTemplate(defaultMatrix())
  }, [currentTemplate])

  const drawTemplate = ({ title, tmpl = [] }) => (
    <>
      <div>{title}</div>
      <Template onClick={drawTmplInCurrentMatrix(tmpl)}>
        {tmpl.map(e => (
          <Line>
            {e.map(f => (
              <Square
                className={f === 1 ? `isSelected` : ``}
                borderSize={1}
                squareSize={5}
              />
            ))}
          </Line>
        ))}
      </Template>
    </>
  )

  return (
    <TemplateWrapper>
      {Object.entries(tmplList).map(value => drawTemplate(value[1]))}
    </TemplateWrapper>
  )
}

export default TemplateContainer
