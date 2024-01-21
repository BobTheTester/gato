import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import styled from 'styled-components'

import logo from '../img/cat.png'
import patte from '../img/patte-small.png'
import background from '../img/background.jpg'
import { Link } from 'react-router-dom'

const StyledRules = styled.div`
  padding-top: 2rem;
  background-image: url(${background});
  height: 100vh;

  h1.ui.header {
    font-size: xx-large;
  }

  .ui.header > img {
    width: 6em;
    margin-bottom: 1rem;
  }

  ul,
  div {
    width: 80%;
    margin: auto;
    font-size: 1.5rem;
    list-style-image: url(${patte});

    li {
      margin-bottom: 0.7rem;
    }
  }

  .buttonContainer {
    text-align: center;
    margin-bottom: 2rem;
  }

  a.ui.button {
    margin-top: 1rem;
    color: white !important;
    background-color: #ff2974 !important;
  }

  .rulesWrapper {
    padding: 1rem;
    background-color: #f5f5f5cc;
    margin: 0 1rem 0 1rem;
    border-radius: 1rem;
    width: 95%;
  }
`

const Rules = () => {
  return (
    <StyledRules>
      <Header
        as="h1"
        icon
        textAlign="center"
      >
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <Header.Content>Boulette time</Header.Content>
      </Header>
      <div className="rulesWrapper">
        <div>Les boulettes sont de retour en version 2024:</div>
        <br />
        <ul>
          <li>Pas une, mais plusieurs boulettes à la clef</li>
          <li>Une boulette peut en cacher une autre</li>
          <li>Toute boulette découverte est à utiliser sous 7 jours</li>
        </ul>
      </div>
      <div className={'buttonContainer'}>
        <Button
          as={Link}
          to={'/used'}
        >
          Boulettes utilisées
        </Button>
      </div>
    </StyledRules>
  )
}

export default Rules
