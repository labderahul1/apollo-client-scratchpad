import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql`
	query allEmp {
		getAllEmployees {
			id
			firstName
			lastName
			designation
			salary
			address {
				city
				state
				country
			}
			department {
				name
			}
		}
	}
`;
export const EMPLOYEE_WITH_ID = gql`
	query employeeWithId($id: String) {
		getEmployeeById(id: $id) {
			id
			firstName
			lastName
			designation
			salary
			address {
				city
				state
				country
			}
			department {
				name
			}
		}
	}
`;