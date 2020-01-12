import React from 'react';
// import patte from '../img/patte.png';

import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import { useMarkAsUsedMutation } from '../generated/graphql';
import BackButton from './BackButton';

const Centerd = styled.div`
    text-align: center;
	padding-top: 2rem;
	
	button {
		color: white !important;
		background-color: #ff2974 !important;
	}
`;
const Used = ({ id = '', refetch } : {id?: string, refetch: any}) => {
	const [markAsUsedMutation] = useMarkAsUsedMutation();
	const onClick = () => {
		{
			markAsUsedMutation({ variables: { id, used: true } }).then(({ data }) => {
				if(data?.update_bons?.returning[0].used) refetch();
			});
		}
	};
	return (
		<Centerd>
			<BackButton />
			<Button onClick={onClick}><Icon name={'paw'}/>Marquer comme utilisé</Button>
		</Centerd>);
};

export default Used;