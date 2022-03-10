import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { paramsContext, templateContext } from './context'
import { Btn } from './globalStyles'

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
  const [newParams, setNewParams] = useState({ ...params })

  const updateParams = (key, type = `string`) => ({ target: { value } }) => {
    const modifiedParams = { ...newParams }
    modifiedParams[key] = type === `number` ? Number.parseInt(value, 10) : value
    setNewParams(modifiedParams)
  }

  const applyParams = () => {
    setTemplate([])
    setParams(newParams)
  }

  return (
    <ParamsWrapper>
      {/* <div>
        <div>squareSize</div>
        <ParamsInput
          type="range"
          onChange={updateParams(`squareSize`, `number`)}
          value={newParams?.squareSize}
          min="20"
          max="30"
        />
        <ParamsInput disabled value={newParams?.squareSize} />
      </div> */}
      <div>
        <div>speed</div>
        <ParamsInput
          type="range"
          onChange={updateParams(`speed`, `number`)}
          value={newParams?.speed}
          min="1"
          max="100"
        />
        <ParamsInput disabled value={newParams?.speed} />
      </div>
      <Btn onClick={applyParams}>Save</Btn>
    </ParamsWrapper>
  )
}

export default ParamsContainer
