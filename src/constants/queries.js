import gql from 'graphql-tag';

export const GET_ALL_TODO = gql`
query allTodo {
	getAllTodoList {
    todoId
    todoLabel
    itemsList {
      itemId
      itemLabel
      status
    }
  }
}
`;

export const GET_TODO_BYID = gql`
query getTodoById($todoId: String) {
	getToDoById(todoId: $todoId) {
    id
    label
    todoStatus
    todoActivity {
      id
      label
      status
    }
	description
  }
}
`;