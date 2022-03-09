import React, { useContext } from 'react'
import styled from 'styled-components'
import loader from 'public/img/1495.gif'
import { paramsContext, templateContext } from './context'
import { Btn } from './globalStyles'

const ParamsInput = styled.input``

const ParamsContainer = () => {
  const {
    params, setParams,
  } = useContext(paramsContext)
  const { setTemplate } = useContext(templateContext)

  const updateParams = param => ({ target }) => {
    const newParams = { ...params }
    newParams[param] = target.value
    setParams(newParams)
  }

  const applyParams = () => {
    setTemplate([])
  }

  return (
    <>
      {loader}
      <ParamsInput onChange={updateParams(`nbrSquare`)} value={params?.nbrSquare} />
      <ParamsInput onChange={updateParams(`squareSize`)} value={params?.squareSize} />
      <ParamsInput onChange={updateParams(`borderSize`)} value={params?.borderSize} />
      <ParamsInput onChange={updateParams(`speed`)} value={params?.speed} />
      <Btn onClick={applyParams}>Save</Btn>
    </>
  )
}

export default ParamsContainer
