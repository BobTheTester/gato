import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBonQuery } from '../generated/graphql';
import styled from 'styled-components';

import Loading from '../components/Loading';
import usedImage from '../img/used.png';
import background from '../img/background.jpg';
import UsedButton from '../components/UsedButton';

const StyledBon = styled.div`
	text-align: center;
    background-image: url(${background});
	height: 100vh;
	
	.title {
		position: absolute;
		background-color: #ffffff8c;
		width: 100%;
		height: 4rem;
		top: 1rem
	}
	img.main {
		width: 100%;
	}

	img.used {
		width: 80%;
		position: absolute;
		top: 6rem;
		left: 10%;
		image-orientation: 30deg;
		transform: rotate(-30deg);
	}
`;

const Resto = () => {
	const { id = '' } = useParams();

	const { data, loading, error, refetch } = useGetBonQuery({
		variables: {
			id
		}
	});

	if(loading) return <Loading/>;

	if ( data && !data.bons.length || error){
		if (error) console.error('oops', error);
		return <Loading text='Pas de bon ici, retourne dormir chatchat'/>;
	}

	return (
		<StyledBon>
			{data?.bons[0] && (
				<div key={data.bons[0].id}>
					{data.bons[0].image && <img className={'main'} src={data.bons[0].image}/>}
					<h1 className={'title'}>{data.bons[0].name}</h1>
					<div className={'description'}>{data.bons[0].text}</div>

					{data.bons[0].used
						? <img className={'used'} src={usedImage}/>
						: <UsedButton id={data.bons[0].id} refetch={refetch}/>}
				</div>
			)}
		</StyledBon>
	);
};

export default Resto;