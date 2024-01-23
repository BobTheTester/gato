import Confetti from 'react-confetti'
import React, { useMemo, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Snake as SnakeLib } from 'react-snake-lib'
import { useDB } from '../contexts/dbContext'
import { SNAKE_ID, StyledFooterWrapper } from '../screens/Bon'
import styled from 'styled-components'
import { ImageDesc } from './ImageDesc'
import BackButton from './BackButton'

interface Props {
  className?: string
}

const WINNING_SCORE = 30

const SnakeDisplay = ({ className }: Props) => {
  const [score, setScore] = useState(0)
  const { markUsed, getBon } = useDB()
  const bon = useMemo(() => getBon(SNAKE_ID), [getBon])
  const [justWon, setJustWon] = useState(false)
  const hasWonAlready = useMemo(() => bon?.isUsed, [bon?.isUsed])
  const [showSnakeInstructions, setShowSnakeInstructions] = useState(true)

  const move = ({
    key,
    keyCode,
    which,
    code
  }: {
    key: string
    keyCode: number
    which: number
    code: string
  }) => {
    const keyEvent = new KeyboardEvent('keydown', {
      key,
      keyCode,
      which,
      code,
      location: 0,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      repeat: false
    })
    document.dispatchEvent(keyEvent)
  }

  const onScoreChange = (score: number) => {
    setScore(score)
    if (score >= WINNING_SCORE && !hasWonAlready) {
      markUsed(SNAKE_ID)
      setJustWon(true)
    }
  }

  const onGameOver = () => {
    setScore(0)
  }

  if (showSnakeInstructions && !!bon) {
    return (
      <ButtonWrapperStyled>
        <ImageDesc bon={bon} />
        <Button
          className="snakeButton"
          onClick={() => setShowSnakeInstructions(false)}
        >
          Montre !!
        </Button>
      </ButtonWrapperStyled>
    )
  }

  return (
    <div className={className}>
      {justWon && <Confetti />}
      <SnakeLib
        onScoreChange={onScoreChange}
        onGameOver={onGameOver}
        // onGameStart={onGameStart}
        width="350px"
        height="350px"
        bgColor="rgb(240, 215, 238)"
        innerBorderColor="#f0eeee"
        snakeSpeed={90}
        borderColor="black"
        snakeColor="#ff2974"
        snakeHeadColor="rgb(131, 36, 123)"
        appleColor="white"
        borderRadius={5}
        snakeHeadRadius={1}
        borderWidth={0}
        shakeBoard={true}
        boxShadow="rgba(185, 185, 185, 0.2) 0px 7px 29px 0px"
        size={16}
        startGameText="Go go go le chat"
        startButtonStyle={{
          color: 'white',
          padding: '6px 20px',
          backgroundColor: '#ff2974',
          borderRadius: '10px',
          fontSize: '17px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: 'rgba(70, 70, 70, 0.4) 2px 3px 5px 0px'
        }}
        startButtonHoverStyle={{
          backgroundColor: '#eb83a8'
        }}
        noWall={true}
      />
      <div>
        Score: {score} croquette{score > 1 ? 's' : ''}
      </div>
      <div className="first-row">
        <Button
          onClick={() =>
            move({
              key: 'ArrowUp',
              keyCode: 38,
              which: 38,
              code: 'ArrowUp'
            })
          }
        >
          <Icon
            name="paw"
            size="large"
          />
        </Button>
      </div>
      <div className="second-row">
        <Button
          onClick={() =>
            move({
              key: 'ArrowLeft',
              keyCode: 37,
              which: 37,
              code: 'ArrowLeft'
            })
          }
        >
          <Icon
            name="paw"
            rotated="counterclockwise"
            size="large"
          />
        </Button>
        <Button
          onClick={() =>
            move({
              key: 'ArrowDown',
              keyCode: 40,
              which: 40,
              code: 'ArrowDown'
            })
          }
        >
          <Icon
            name="paw"
            flipped="vertically"
            size="large"
          />
        </Button>
        <Button
          onClick={() =>
            move({
              key: 'ArrowRight',
              keyCode: 39,
              which: 39,
              code: 'ArrowRight'
            })
          }
        >
          <Icon
            name="paw"
            rotated="clockwise"
            size="large"
          />
        </Button>
      </div>
      <StyledFooterWrapper>
        <BackButton />
      </StyledFooterWrapper>
    </div>
  )
}

export const Snake = styled(SnakeDisplay)`
  .snakeBoard {
    margin: auto;
  }

  .first-row,
  .second-row {
    .ui.button {
      min-height: 5rem;
      min-width: 5rem;
      margin: 0px 1rem 0px 0px;
      color: white !important;
      background-color: #ff2974 !important;
    }

    .paw.icon {
      margin: 0 !important;
    }
  }

  .first-row {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .second-row {
    margin-bottom: 3rem;
  }
`

const ButtonWrapperStyled = styled('div')`
  .snakeButton {
    margin-top: 1rem;
    color: white !important;
    background-color: #ff2974 !important;
  }
`
