import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { paramsContext, templateContext } from '../context'
import { Btn } from '../globalStyles'

const ParamsInput = styled.input``

const ParamsContainer = () => {
  const { params, setParams } = useContext(paramsContext)
  const { setTemplate } = useContext(templateContext)
  const [newParams, setNewParams] = useState({ ...params })
  console.log(newParams)
  const updateParams = param => ({ target }) => {
    const modifiedParams = { ...newParams }
    modifiedParams[param] = target.value
    setNewParams(modifiedParams)
  }

  const applyParams = () => {
    setTemplate([])
    setParams(newParams)
  }

  return (
    <>
      <ParamsInput type="range" onChange={updateParams(`squareSize`)} value={newParams?.squareSize} min="10" max="30" />
      <ParamsInput disabled value={newParams?.squareSize} />
      <ParamsInput type="range" onChange={updateParams(`nbrSquare`)} value={newParams?.borderSize} min="1" max="70" />
      <ParamsInput disabled value={newParams?.borderSize} />
      <ParamsInput onChange={updateParams(`speed`)} value={newParams?.speed} min="1" max="50" />
      <Btn onClick={applyParams}>Save</Btn>
    </>
  )
}

export default ParamsContainer
