import gql from "graphql-tag";


export const employeeFragment = gql`
	fragment employeeFields on Employee {
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
`;