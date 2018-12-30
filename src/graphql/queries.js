import gql from "graphql-tag";
import { employeeFragment } from './fragments';

export const ALL_EMPLOYEES = gql`
	query allEmp {
		getAllEmployees {
			...employeeFields
			... on Engineer {
				projects {
					name
				}
			}
			... on HumanResource {
				friends
			}
			... on MarketingExec {
				bonus
			}
		}
	}
	${employeeFragment}
`;
export const EMPLOYEE_WITH_ID = gql`
	query employeeWithId($id: String) {
		getEmployeeById(id: $id) {
			...employeeFields
		}
	}
	${employeeFragment}
`;
