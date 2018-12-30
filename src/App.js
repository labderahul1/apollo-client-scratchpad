import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import EmployeeList from './emplyee/EmployeeList';
import EditEmployee from './emplyee/EditEmployee';

const client = new ApolloClient({
	uri: "http://localhost:3100/graphql"
});

class App extends Component {
  render() {
    return (
			<ApolloProvider client={client}>
				<Router>
					<div>
						<Route path="/" component={EmployeeList} exact/>
						<Route path="/:id" component={EditEmployee} />
					</div>
				</Router>
			</ApolloProvider>
    );
  }
}

export default App;
