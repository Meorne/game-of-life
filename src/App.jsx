import React, { useState, useMemo } from 'react'
import MatrixContainer from './MatrixContainer'
import ParamsContainer from './ParamsContainer'
import TemplateContainer from './TemplateContainer'
import GlobalStyles from './globalStyles'
import {
  matrixContext, templateContext, paramsContext, theme,
} from './context'

const App = () => {
  const [currentTemplate, setTemplate] = useState([])
  const templateMemo = useMemo(() => ({ currentTemplate, setTemplate }), [currentTemplate])

  const [currentMatrix, setMatrix] = useState([])
  const matrixMemo = useMemo(() => ({ currentMatrix, setMatrix }), [currentMatrix])

  const [params, setParams] = useState({
    squareSize: 30,
    nbrSquare: 30,
    borderSize: 3,
    speed: 30,
  })
  const paramsMemo = useMemo(() => ({ params, setParams }), [params])

  return (
    <paramsContext.Provider value={paramsMemo}>
      <templateContext.Provider value={templateMemo}>
        <matrixContext.Provider value={matrixMemo}>
          <GlobalStyles theme={theme} />
          <MatrixContainer />
          <TemplateContainer />
          <ParamsContainer />
        </matrixContext.Provider>
      </templateContext.Provider>
    </paramsContext.Provider>
  )
}

export default App