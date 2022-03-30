import React, { useContext } from 'react'
import styled from 'styled-components'
import { paramsContext, templateContext, lifeCycleContext } from './context'
// import { Btn } from './globalStyles'

const ParamsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  padding: 5px;
`
const ParamsInput = styled.input``

const ParamsContainer = () => {
  const { params, setParams } = useContext(paramsContext)
  const { setTemplate } = useContext(templateContext)
  const { lifeCycleState, setLifeCycleState } = useContext(lifeCycleContext)
  const { speed, squareSize } = params

  const updateParams = (key, type = `string`, resetMatrix = false) => ({ target: { value } }) => {
    const modifiedParams = { ...params }
    modifiedParams[key] = type === `number` ? Number.parseInt(value, 10) : value
    setParams(modifiedParams)
    if (resetMatrix) {
      setTemplate([])
      setLifeCycleState(`stoped`)
    }
  }

  // const applyParams = () => setParams(newParams)

  return (
    <ParamsWrapper>
      <div>
        <div>squareSize</div>
        <ParamsInput
          type="range"
          onChange={updateParams(`squareSize`, `number`, true)}
          value={squareSize}
          min="20"
          max="30"
          disabled={lifeCycleState === `start`}
        />
        <ParamsInput disabled value={squareSize} />
      </div>
      <div>
        <div>speed</div>
        <ParamsInput
          type="range"
          onChange={updateParams(`speed`, `number`)}
          value={speed}
          min="1"
          max="100"
        />
        <ParamsInput disabled value={`${speed}%`} />
      </div>
    </ParamsWrapper>
  )
}

export default ParamsContainer
