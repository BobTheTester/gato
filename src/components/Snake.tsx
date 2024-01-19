import Confetti from 'react-confetti'
import React, { useMemo, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Snake as SnakeLib } from 'react-snake-lib'
import { useDB } from '../contexts/dbContext'
import { SNAKE_ID } from '../screens/Bon'

export const Snake = () => {
  const [score, setScore] = useState(0)
  const { markUsed, getBon } = useDB()
  const [justWon, setJustWon] = useState(false)
  const hasWonAlready = useMemo(() => getBon(SNAKE_ID)?.isUsed, [])
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
    if (score >= 30 && !hasWonAlready) {
      markUsed(SNAKE_ID)
      setJustWon(true)
    }
  }

  const onGameOver = () => {
    setScore(0)
  }

  return (
    <>
      {justWon && <Confetti />}
      <SnakeLib
        onScoreChange={onScoreChange}
        onGameOver={onGameOver}
        // onGameStart={onGameStart}
        width="400px"
        height="400px"
        bgColor="rgb(240, 215, 238)"
        innerBorderColor="#f0eeee"
        snakeSpeed={90}
        borderColor="black"
        snakeColor="rgb(202, 57, 190)"
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
          cursor: 'pointer'
        }}
        startButtonHoverStyle={{
          backgroundColor: '#be1e56'
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
          <Icon name="paw" />
        </Button>
      </div>
      <div>
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
          />
        </Button>
      </div>
    </>
  )
}
