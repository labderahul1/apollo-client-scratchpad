import { Component } from 'preact';
import { Router } from 'preact-router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Header from './header';
import Home from './routes/home';

const client = new ApolloClient({
	uri: 'http://localhost:3100/graphql'
});

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Home path="/home" />
					</Router>
				</div>
			</ApolloProvider>
		);
	}
}
