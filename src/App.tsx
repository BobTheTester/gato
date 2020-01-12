import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import StyledRules from './screens/Rules';
import Bon from './screens/Bon';
import 'semantic-ui-css/semantic.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import UsedBon from './screens/UsedBon';

const client = new ApolloClient({
	request: (operation) => {
		operation.setContext({
			headers: {
				'x-hasura-admin-secret': `${process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET}`
			}
		});
	},
	uri: `${process.env.REACT_APP_HASURA_GRAPHQL_URL}`
});

const App: React.FC = () => {

	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route exact path="/">
						<StyledRules/>
					</Route>
					<Route path="/bon/:id">
						<Bon/>
					</Route>
					<Route path="/used">
						<UsedBon/>
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
};

export default App;
