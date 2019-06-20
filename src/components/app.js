import { h, Component } from 'preact';
import { Router } from 'preact-router';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Header from './header';
import ExchangeRates from './ExchangeRates';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import EditTodo from '../routes/edit';


const client = new ApolloClient({
	uri: 'http://localhost:3100/graphql'
});

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		// client.query({ query: gql`
		// 	query allEmp {
		// 		getAllEmployees {
		// 			lastName
		// 			id
		// 			firstName
		// 		}
		// 	}`
		// }).then(result => console.log(result));
		return (
			<ApolloProvider client={client}>
				<div id="app">
					<Header />
					{/* <ExchangeRates /> */}
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Home path="/home" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
						<EditTodo path="/edit/:user" />
					</Router>
				</div>
			</ApolloProvider>
		);
	}
}
