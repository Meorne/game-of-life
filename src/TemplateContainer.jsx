import React, { useContext, useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import styled from 'styled-components'

import { templateContext, paramsContext } from './context'
import { Line, Square } from './globalStyles'
import { gliderTmpl, gliderGunTmpl } from './templateList'

const TemplateWrapper = styled.div`
  display: flex;
`
const Template = styled.div`
  margin: 10px;
`

const TemplateContainer = () => {
  const { currentTemplate, setTemplate } = useContext(templateContext)
  // const { currentMatrix } = useContext(matrixContext)
  const { params: { nbrSquare } } = useContext(paramsContext)

  const defaultMatrix = () => {
    const newMatrix = []
    let matrixX = 0
    let matrixY = 0

    while (matrixY < nbrSquare) {
      newMatrix[matrixY] = []
      while (matrixX < nbrSquare) {
        newMatrix[matrixY][matrixX] = 0
        matrixX++
      }
      matrixX = 0
      matrixY++
    }

    return newMatrix
  }

  const drawTmplInCurrentMatrix = tmpl => () => {
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

  const drawTemplate = tmpl => (
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
  )

  return (
    <TemplateWrapper>
      {drawTemplate(gliderTmpl)}
      {drawTemplate(gliderGunTmpl)}
    </TemplateWrapper>
  )
}

export default TemplateContainer
