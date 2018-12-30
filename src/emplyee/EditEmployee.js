import React, { Component } from 'react';
import { graphql, Mutation } from "react-apollo";
import * as QUERIES from '../graphql/queries';
import * as MUTATIONS from '../graphql/mutations';
import Employee from './Employee';
import './EditEmployee.css';


class EditEmployee extends Component {
	state = {
		firstName: null,
		lastName: null,
		designation: null,
		salary: null
	}

	render() {
		const { match: { params: { id } }, employee, loading, error } = this.props;
		if (error) return <h4> Error loading data</h4>;
		if (loading) return <h4> Loading data... </h4>;
		return (
			<div>
				<div className="editContainer">
					<p><b>Id: </b>{employee.id}</p>
					<p><b>First Name: </b>{employee.firstName}</p>
					<p><b>Last Name: </b>{employee.lastName} </p>
					<p><b>Designation: </b>{employee.designation} </p>
					<p><b>Salary: </b>{employee.salary} </p>
					<p><b>Department: </b>{employee.department.name} </p>
					<p><b>Address: </b>{employee.address.city}, {employee.address.state}, {employee.address.country},  </p>
				</div>
				<EditEmployeeForm employee={employee} />
			</div>
		);
	}
}

class EditEmployeeForm extends Component {
	state = {
		id: null,
		firstName: "",
		lastName: "",
		designation: "",
		salary: ""
	}

	componentDidMount() {
		const { employee } = this.props;
		this.setState({
			id: employee.id,
			firstName: employee.firstName,
			lastName: employee.lastName,
			designation: employee.designation,
			salary: employee.salary,
		});
	}

	onFirstNameChange = (e) => {
		this.setState({
			firstName: e.target.value
		});
	}
	onLastNameChange = (e) => {
		this.setState({
			lastName: e.target.value
		});
	}
	onDesignationChange = (e) => {
		this.setState({
			designation: e.target.value
		});
	}
	onSalaryChange = (e) => {
		this.setState({
			salary: e.target.value
		});
	}

	onSubmit = (editEmployee) => {
		const { id, firstName, lastName, designation, salary } = this.state;
		editEmployee(
			{ 
				variables: { 
					employee: { 
						id,
						firstName,
						lastName,
						designation,
						salary
					}
				},
				optimisticResponse: {
					__typename: "Mutation",
					id: id,
					editEmployee: {
						id,
						firstName,
						lastName,
						designation,
						salary
					}
				} 
			}
		)
	}
	
	render() {
		const { id, firstName, lastName, designation, salary } = this.state;
		return (
			<Mutation 
				mutation={MUTATIONS.EDIT_EMPPLOYEE}
				update={(cache, { data: { editEmployee }})=>{
					const data = cache.readQuery({ query: QUERIES.EMPLOYEE_WITH_ID, variables: { id: id }});
					data.firstName = editEmployee.firstName;
					data.lastName = editEmployee.lastName;
					data.designation = editEmployee.designation;
					data.salary = editEmployee.salary;
					cache.writeQuery({
						query: QUERIES.EMPLOYEE_WITH_ID,
						variables: {id: data.id},
						data
					})
				}}	
			>
			{
				editEmployee => (
					<form className="editContainer">
						<p><b>First Name: </b><input type="text" value={firstName} onChange={(e) => this.onFirstNameChange(e)} /></p>
						<p><b>Last Name: </b><input type="text" value={lastName} onChange={(e) => this.onLastNameChange(e)} /></p>
						<p><b>Designation: </b><input type="text" value={designation} onChange={(e) => this.onDesignationChange(e)}/></p>
						<p><b>Salary: </b><input type="text" value={salary} onChange={(e) => this.onSalaryChange(e)}/></p>
						<button type="button" onClick={() => this.onSubmit(editEmployee)}>Submit</button>
					</form>
				)
			}
			</Mutation>
		);
	}
}

export default graphql(QUERIES.EMPLOYEE_WITH_ID, {
	options: ({ match: { params: { id } } }) => ({ variables: { id }, fetchPolicy: 'cache-first' }),
	props: ({data: {loading, error, getEmployeeById}}) => {return {employee: getEmployeeById, loading, error}}
})(EditEmployee);