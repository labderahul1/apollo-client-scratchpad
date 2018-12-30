import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Employee.css';

class Employee extends Component {

	render() {
		const { info } = this.props;
		return (
			<div className="empContainer">
				<p><b>Id: </b>{ info.id }</p>
				<p><b>First Name: </b>{info.firstName}</p>
				<p><b>Last Name: </b>{info.lastName} </p>
				<p><b>Designation: </b>{info.designation} </p>
				<p><b>Salary: </b>{info.salary} </p>
				<p><b>Department: </b>{info.department.name} </p>
				<p><b>Address: </b>{info.address.city}, {info.address.state}, {info.address.country}  </p>
				{
					info.projects && (
						<p><b>Projects: </b> {info.projects.map(p => p.name).join(', ')} </p>
					)
				}
				{
					info.friends && (
						<p><b>Friends: </b> {info.friends.join(', ')} </p>
					)
				}
				{
					info.bonus && (
						<p><b>Bonus: </b> {info.bonus} </p>
					)
				}
				<Link to={`/${info.id}`}>
					<button type="button">Edit</button>
				</Link>
			</div>
		);
	}
}

export default Employee;
