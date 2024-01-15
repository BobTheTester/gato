import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Loading from '../components/Loading'
import usedImage from '../img/used.png'
import background from '../img/background.jpg'
import UsedButton from '../components/UsedButton'
import BackButton from '../components/BackButton'
import { Bon, useDB } from '../contexts/dbContext'

const StyledBon = styled.div`
  text-align: center;
  background-image: url(${background});
  height: 100vh;

  .description {
    padding: 1rem;
  }

  .title {
    position: absolute;
    background-color: #ffffff8c;
    width: 100%;
    height: 4rem;
    top: 1rem;
    padding-top: 0.75rem;
  }
  img.main {
    width: 100%;
  }

  img.used {
    width: 80%;
    position: absolute;
    top: 6rem;
    left: 10%;
    image-orientation: 30deg;
    transform: rotate(-30deg);
    opacity: 30%;
  }
`

const Resto = () => {
  const { getBon, isLoading } = useDB()
  const { id = '' } = useParams<{ id: string }>()
  const [bon, setBon] = useState<Bon | undefined>()
  useEffect(() => {
    console.log('is loading')
    if (isLoading) return

    const newBon = getBon(id)

    if (!newBon?.title) {
      console.error('oops bon in undefined', newBon)
      return
    }

    setBon(newBon)
  }, [bon, getBon, id, isLoading])

  if (isLoading) return <Loading />

  return (
    <StyledBon>
      {bon && (
        <>
          <div>
            {bon.imageUrl && (
              <img
                className={'main'}
                src={bon.imageUrl}
              />
            )}
            <h1 className={'title'}>{bon.title}</h1>
            <div className={'description'}>{bon.description}</div>

            {bon.isUsed ? (
              <>
                <img
                  className={'used'}
                  src={usedImage}
                />
                <BackButton />
              </>
            ) : (
              <UsedButton id={id} />
            )}
          </div>
        </>
      )}
    </StyledBon>
  )
}

export default Resto
