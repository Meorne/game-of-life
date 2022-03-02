import React, { useContext, useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { templateContext, paramsContext, matrixContext } from './context'
import { Line, Square } from './globalStyles'

const gliderTmpl = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0],
]
const TemplateContainer = () => {
  const { currentTemplate, setTemplate } = useContext(templateContext)
  const { currentMatrix } = useContext(matrixContext)
  const { params: { nbrSquare } } = useContext(paramsContext)

  useEffect(() => {
    if (currentTemplate.length === 0) {
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
      setTemplate(newMatrix)
    }
  }, [currentTemplate])

  const drawTmplInCurrentMatrix = tmpl => () => {
    const newMatrix = cloneDeep(currentMatrix)

    const yCmL = currentMatrix.length
    const xCmL = currentMatrix[0].length

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

  const drawTemplate = tmpl => (
    <div onClick={drawTmplInCurrentMatrix(tmpl)}>
      {tmpl.map(e => (
        <Line>
          {
            e.map(f => (
              <Square
                borderSize={1}
                squareSize={5}
                isSelected={f === 1}
              />
            ))
          }
        </Line>
      ))}
    </div>
  )

  return (
    <div>
      {drawTemplate(gliderTmpl)}
    </div>
  )
}

export default TemplateContainer
