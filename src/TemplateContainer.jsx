import React, { useContext, useEffect } from 'react'
import { templateContext, paramsContext } from './context'
import { Line, Square } from './globalStyles'

const gliderTmpl = [
  [0, 0, 1],
  [1, 0, 1],
  [0, 1, 1],
]
const TemplateContainer = () => {
  const { currentTemplate, setTemplate } = useContext(templateContext)
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

  const drawTemplate = tmpl => {
    const drawTmpl = tmpl.map(e => (
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
    ))
    const mapTmpl = (
      <div onClick={() => setTemplate(tmpl)}>
        {drawTmpl}
      </div>
    )
    return mapTmpl
  }

  return (
    <div>
      {drawTemplate(gliderTmpl)}
    </div>
  )
}

export default TemplateContainer
