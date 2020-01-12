import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import patte from '../img/patte-small.png';
import Loading from '../components/Loading';
import background from '../img/background.jpg';
import usedImage from '../img/used.png';
import { useGetUsedBonQuery } from '../generated/graphql';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

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
            margin-bottom: .7rem;
        }
	}
	
	img.used {
		width: 70%;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
`;

const UsedBon = () => {
	const { data, loading, error } = useGetUsedBonQuery();

	if(loading) return <Loading/>;

	if ( data && !data.bons.length){
		return <Loading text={'Trop la chance t\'as encore tout tes bons'} backButton={true}/>;
	}

	if (error) console.error('oops', error);

	return (
		<StyledUsedBon>
			<img className={'used'} src={usedImage}/>
			<ul>
				{data?.bons.map(bon => <li key={bon.id}><Link to={`/bon/${bon.id}`}>{bon.name} (utilisé le {moment(bon.updated_at).format('DD/MM/Y')})</Link></li>)}
			</ul>
			<BackButton />
		</StyledUsedBon>
	);
};

export default UsedBon;