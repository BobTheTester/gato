import React from 'react'
import QRCode from 'qrcode.react'
import styled from 'styled-components'

import patte from '../img/patte-small.png'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { useDB } from '../contexts/dbContext'

const StyledUsedBon = styled.div`
  text-align: center;

  ul {
    text-align: left;
    width: 80%;
    margin: auto;
    list-style-image: url(${patte});

    li {
      margin-bottom: 0.7rem;
    }
  }

  canvas {
    margin: 2rem;
  }
`

const SuperSecret = () => {
  const { isLoading, markUsed, bons } = useDB()

  const onClick = (id: string) => {
    {
      markUsed(id, false)
    }
  }

  if (isLoading) return <Loading />

  // if (error) return <div>{error}</div>;

  return (
    <StyledUsedBon>
      <ul>
        {Object.entries(bons).map(([id, bon]) => (
          <li key={id}>
            <Link to={`/bon/${id}`}>
              {bon.title} {bon.isUsed ? '(used)' : '(unused)'}
            </Link>{' '}
            {bon.isUsed && <button onClick={() => onClick(id)}>unuse it</button>}
          </li>
        ))}
      </ul>
      {Object.entries(bons)
        .filter(([, bon]) => !bon.isUsed)
        .map(([id]) => (
          <QRCode
            key={id}
            value={`https://gato.thib.top/bon/${id}`}
          />
        ))}
    </StyledUsedBon>
  )
}

export default SuperSecret
