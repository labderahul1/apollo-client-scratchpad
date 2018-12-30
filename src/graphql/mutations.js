import gql from "graphql-tag";


export const EDIT_EMPPLOYEE = gql`
	mutation editEmployee($employee: EditEmployeeInput) {
  editEmployee(employee: $employee) {
		id
		firstName
		lastName
		designation
		salary
  }
}
`;