import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Loading from '../components/Loading'
import usedImage from '../img/used.png'
import background from '../img/background.jpg'
import UsedButton from '../components/UsedButton'
import BackButton from '../components/BackButton'
import { Bon, useDB } from '../contexts/dbContext'
import { Snake } from '../components/Snake'
import { Button } from 'semantic-ui-react'

export const StyledBon = styled.div`
  text-align: center;
  background-image: url(${background});
  background-repeat: repeat;
  min-height: 100vh;

  .paw.icon {
    margin: 0 !important;
  }

  .snakeBoard {
    margin: auto;
  }

  .description {
    padding: 1rem;
    background-color: #fffc;
    margin: 0 1rem 0 1rem;
    border-radius: 1rem;
  }

  .title {
    position: absolute;
    top: 1rem;
    width: 90%;
    height: 0;
    line-height: 0;
    color: #494949;
    z-index: 1;
    -webkit-filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    border: 20px solid #ffffff8c;
    border-left: 0;
    border-right: 10px solid transparent;
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

  .first-row {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .snakeWrapper {
    .ui.button {
      min-height: 5rem;
      min-width: 5rem;
      margin: 0px 1rem 0px 0px;
    }
  }

  .footerButtonWrapper {
    padding-bottom: 1rem;
  }

  .snakeButton {
    margin-top: 1rem;
    color: white !important;
    background-color: #ff2974 !important;
  }
`

export const SNAKE_ID = '1-123'

const BonDisplay = () => {
  const { getBon, isLoading } = useDB()
  const { id = '' } = useParams<{ id: string }>()
  const [bon, setBon] = useState<Bon | undefined>()
  const [showSnakeInstructions, setShowSnakeInstructions] = useState(true)

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

  return (
    <StyledBon>
      {bon && (
        <>
          {id === SNAKE_ID && !showSnakeInstructions ? (
            <div className="snakeWrapper">
              <Snake />
            </div>
          ) : (
            <div>
              <img
                className={'main'}
                src={bon.imageUrl}
              />
              <h1 className={'title'}>{bon.title}</h1>
              <div className={'description'}>{bon.description}</div>
              {id === SNAKE_ID && (
                <Button
                  className="snakeButton"
                  onClick={() => setShowSnakeInstructions(false)}
                >
                  Montre !!
                </Button>
              )}
            </div>
          )}
          <div className="footerButtonWrapper">
            {bon.isUsed && (id !== SNAKE_ID || showSnakeInstructions) ? (
              <>
                <img
                  className={'used'}
                  src={usedImage}
                />
                <BackButton />
              </>
            ) : (
              id !== SNAKE_ID && <UsedButton id={id} />
            )}
          </div>
        </>
      )}
    </StyledBon>
  )
}

export default BonDisplay
