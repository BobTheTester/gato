import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Loading from '../components/Loading'
import background from '../img/background.jpg'
import UsedButton from '../components/UsedButton'
import { Bon, useDB } from '../contexts/dbContext'
import { Snake } from '../components/Snake'
import { ImageDesc } from '../components/ImageDesc'
import BackButton from '../components/BackButton'

export const StyledBon = styled.div`
  text-align: center;
  background-image: url(${background});
  background-repeat: repeat;
  min-height: 100vh;

  .footerButtonWrapper {
    padding-bottom: 1rem;
  }
`
export const StyledFooterWrapper = styled.div`
  padding-bottom: 1rem;
`

export const SNAKE_ID = '1-123'

const BonDisplay = () => {
  const { getBon, isLoading } = useDB()
  const { id = '' } = useParams<{ id: string }>()
  const [bon, setBon] = useState<Bon | undefined>()

  useEffect(() => {
    if (isLoading) return

    const newBon = getBon(id)

    if (!newBon) {
      console.error('oops bon is undefined', newBon)
      return
    }

    setBon(newBon)
  }, [bon, getBon, id, isLoading])

  if (isLoading) return <Loading />

  if (id === SNAKE_ID) {
    return (
      <StyledBon>
        <Snake />
      </StyledBon>
    )
  }

  return (
    <StyledBon>
      {bon && (
        <>
          <ImageDesc bon={bon} />
          <StyledFooterWrapper>
            {bon.isUsed ? <BackButton /> : <UsedButton id={id} />}
          </StyledFooterWrapper>
        </>
      )}
    </StyledBon>
  )
}

export default BonDisplay
