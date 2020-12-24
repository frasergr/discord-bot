import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const styledSpinnerDiv = styled.div`
  width: 100px;
  height: 100px;
  margin: auto;
  display: block;
`

const styledSpinnerSpan = styled.span`
  margin-right: 8px;
  float: left;
`

const Loader = ({ animation, role, size, ...props }) => {
  return (
    <Spinner size={size} animation={animation} role={role} as={props.button ? styledSpinnerSpan : styledSpinnerDiv}>
      <span className={'sr-only'}>Loading...</span>
    </Spinner>
  )
}

Loader.defaultProps = {
  animation: 'border',
  role: 'status',
  size: 'lg',
  as: styledSpinnerDiv
}

export default Loader
