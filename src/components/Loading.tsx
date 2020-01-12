import React from 'react';
import patte from '../img/patte.png';
import background from '../img/background.jpg';
import styled from 'styled-components';

const Centerd = styled.div`
    height: 100vh;
    background-image: url(${background});
    text-align: center;
    padding-top: 2rem;
`;

const Loader = ({ text = '' } : {text?: string}) => {
	return (
		<Centerd>
			<img src={patte} className="App-logo" alt="logo" />
			{text && <h2>{text}</h2>}
		</Centerd>
	);
};

export default Loader;