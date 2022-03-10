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
  const defaulfParams = {
    squareSize: 30,
    speed: 50,
  }

  const [params, setParams] = useState(defaulfParams)
  const paramsMemo = useMemo(() => ({ params, setParams }), [params])

  return (
    <lifeCycleContext.Provider value={lifeCycleMemo}>
      <paramsContext.Provider value={paramsMemo}>
        <templateContext.Provider value={templateMemo}>
          <matrixContext.Provider value={matrixMemo}>
            <GlobalStyles theme={theme} />
            <ParamsContainer />
            <TemplateContainer />
            <MatrixContainer />
          </matrixContext.Provider>
        </templateContext.Provider>
      </paramsContext.Provider>
    </lifeCycleContext.Provider>
  )
}

export default App
