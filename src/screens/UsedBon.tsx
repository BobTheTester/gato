import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

import patte from '../img/patte-small.png'
import Loading from '../components/Loading'
import background from '../img/background.jpg'
import usedImage from '../img/used.png'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useDB } from '../contexts/dbContext'

const StyledUsedBon = styled.div`
  text-align: center;
  background-image: url(${background});
  height: 100vh;

  ul {
    text-align: left;
    width: 80%;
    margin: auto;
    list-style-image: url(${patte});

    li {
      margin-bottom: 0.7rem;
    }
  }

  img.used {
    width: 70%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-width: 400px;
  }

  .usedWrapper {
    padding: 1rem;
    background-color: #f5f5f5cc;
    margin: 0 1rem 0 1rem;
    border-radius: 1rem;
    width: 95%;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

const UsedBon = () => {
  const { isLoading, usedBons } = useDB()

  if (isLoading) return <Loading />

  // if ( data && !data.bons.length){
  // 	return <Loading text={'Trop la chance t\'as encore toutes tes boulettes'} backButton={true}/>;
  // }

  // if (error) console.error('oops', error);

  return (
    <StyledUsedBon>
      <img
        className="used"
        src={usedImage}
      />
      <div className="usedWrapper">
        <ul>
          {Object.entries(usedBons).map(([id, bon]) => (
            <li key={id}>
              <Link to={`/bon/${id}`}>
                {bon.title} (utilisé le {moment(bon.usedDate).format('DD/MM/Y')})
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <BackButton />
    </StyledUsedBon>
  )
}

export default UsedBon
