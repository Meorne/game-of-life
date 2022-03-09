import React from 'react'
import styled from 'styled-components'
import ParamsContainer from './options/ParamsContainer'
import TemplateContainer from './options/TemplateContainer'

const OprionWrapper = styled.div`
  position:absolute;
  background:#fff ;
`

const OptionContainer = () => (
  <OprionWrapper>
    <ParamsContainer />
    <TemplateContainer />
  </OprionWrapper>
)

export default OptionContainer
