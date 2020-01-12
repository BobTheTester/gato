import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import logo from '../img/cat.png';
import patte from '../img/patte-small.png';
import background from '../img/background.jpg';
import { Link } from 'react-router-dom';

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

    ul {
        width: 80%;
        margin: auto;
        font-size: 1.5rem;
        list-style-image: url(${patte});

        li {
            margin-bottom: .7rem;
        }
    }

    .buttonContainer {
        text-align: center;
    }
    
    a.ui.button {
        margin-top:1rem;
		color: white !important;
		background-color: #ff2974 !important;
    }
`;

const Rules = () => {
	return(
		<StyledRules>
			<Header as='h1' icon textAlign='center'>
				<img src={logo} className="App-logo" alt="logo" />
				<Header.Content>Règles du chat</Header.Content>
			</Header>
			<ul>
				<li>Pas plus d&apos;un tirage de boulette par semaine.</li>
				<li>Boulette à utiliser sous 7 jours.</li>
				<li>Sac de boulettes valable jusqu&apos;au 31/12/20.</li>
			</ul>
			<div className={'buttonContainer'}>
				<Button as={Link} to={'/used'}>Voir les bons utilisés</Button>
			</div>
		</StyledRules>
	);
};

export default Rules;