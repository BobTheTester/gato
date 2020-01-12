import React from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

import patte from '../img/patte-small.png';
import Loading from '../components/Loading';
import { useGetAllBonsQuery } from '../generated/graphql';
import { Link } from 'react-router-dom';

const StyledUsedBon = styled.div`
	text-align: center;

	ul {
		text-align: left;
        width: 80%;
        margin: auto;
        list-style-image: url(${patte});

        li {
            margin-bottom: .7rem;
        }
	}

	canvas {
		margin: 2rem;
	}
`;

const SuperSecret = () => {
	const { data, loading, error } = useGetAllBonsQuery();

	if(loading) return <Loading/>;

	if (error) return <div>{error}</div>;

	return (
		<StyledUsedBon>
			<ul>
				{data?.bons.map(bon => <li key={bon.id}><Link to={`/bon/${bon.id}`}>{bon.name} {bon.used ? '(used)' : '(unused)'}</Link></li>)}
			</ul>
			{data?.bons.map(bon => <QRCode key={bon.id} value={`https://gato.thib.now.sh/bon/${bon.id}`}/>)}
		</StyledUsedBon>
	);
};

export default SuperSecret;