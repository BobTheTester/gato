import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledBon = styled.span`
	a.ui.button {
        margin-top:1rem;
		color: white !important;
		background-color: #ff2974 !important;
    }
`;
const BackButton = () => {
	return (
		<StyledBon><Button as={Link} to={'/'}><Icon name={'arrow left'}/>Retour au panier</Button></StyledBon>
	);
};

export default BackButton;