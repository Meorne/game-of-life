import React, { useState, useMemo } from 'react'
import MatrixContainer from './MatrixContainer'
import ParamsContainer from './ParamsContainer'
import TemplateContainer from './TemplateContainer'
import GlobalStyles from './globalStyles'
import {
  matrixContext, templateContext, paramsContext, theme, lifeCycleContext,
} from './context'

const App = () => {
  const [currentTemplate, setTemplate] = useState([])
  const templateMemo = useMemo(() => ({ currentTemplate, setTemplate }), [currentTemplate])

  const [currentMatrix, setMatrix] = useState([])
  const matrixMemo = useMemo(() => ({ currentMatrix, setMatrix }), [currentMatrix])

  const [lifeCycleState, setLifeCycleState] = useState(`stoped`)
  const lifeCycleMemo = useMemo(() => ({ lifeCycleState, setLifeCycleState }), [lifeCycleState])

  const [params, setParams] = useState({
    squareSize: 30,
    nbrSquare: 20,
    borderSize: 3,
    speed: 20,
  })
  const paramsMemo = useMemo(() => ({ params, setParams }), [params])

  return (
    <lifeCycleContext.Provider value={lifeCycleMemo}>
      <paramsContext.Provider value={paramsMemo}>
        <templateContext.Provider value={templateMemo}>
          <matrixContext.Provider value={matrixMemo}>
            <GlobalStyles theme={theme} />
            <TemplateContainer />
            <ParamsContainer />
            <MatrixContainer />
          </matrixContext.Provider>
        </templateContext.Provider>
      </paramsContext.Provider>
    </lifeCycleContext.Provider>
  )
}

export default App
