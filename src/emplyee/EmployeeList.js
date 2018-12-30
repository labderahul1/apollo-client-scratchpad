import React, { Component } from 'react';
import { Query } from "react-apollo";
import * as QUERIES from '../graphql/queries';
import Employee from './Employee';

class EmployeeList extends Component {

	render() {
		return (
			<Query query={QUERIES.ALL_EMPLOYEES} fetchPolicy="cache-and-network">
			{
				({loading, error, data: { getAllEmployees: employees }}) => {
					if (error) return <h4> Error loading data</h4>;
					if (loading) return <h4> Loading data... </h4>;
					else {
						return (
							employees.map(e => <Employee key={e.id} info={e}/>)
						) 
					}
				}
			}
			</Query>
		)
	}
}

export default EmployeeList;