import React, { useContext } from 'react'
import styled from 'styled-components'
import { paramsContext, templateContext } from './context'

const ParamsInput = styled.input``

const ParamsContainer = () => {
  const {
    params, params: {
      squareSize, borderSize, speed, nbrSquare,
    }, setParams,
  } = useContext(paramsContext)
  const { setTemplate } = useContext(templateContext)

  const updateParams = param => ({ target }) => {
    const newParams = { ...params }
    console.log(target.value)
    newParams[param] = target.value
    setParams(newParams)
    setTemplate([])
  }

  return (
    <div>
      <ParamsInput onChange={updateParams(`nbrSquare`)} value={nbrSquare} />
      <ParamsInput onChange={updateParams(`squareSize`)} value={squareSize} />
      <ParamsInput onChange={updateParams(`borderSize`)} value={borderSize} />
      <ParamsInput onChange={updateParams(`speed`)} value={speed} />
    </div>
  )
}

export default ParamsContainer
