import React from 'react'

import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import BackButton from './BackButton'
import { useDB } from '../contexts/dbContext'

const Centerd = styled.div`
  text-align: center;
  padding-top: 2rem;

  button {
    color: white !important;
    background-color: #ff2974 !important;
  }
`
const Used = ({ id = '' }: { id?: string }) => {
  const { markUsed } = useDB()
  const onClick = () => {
    {
      markUsed(id)
    }
  }
  return (
    <Centerd>
      <BackButton />
      <Button onClick={onClick}>
        <Icon name={'paw'} />
        Use
      </Button>
    </Centerd>
  )
}

export default Used
