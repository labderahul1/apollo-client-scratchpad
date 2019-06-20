import gql from 'graphql-tag';

export const CREATE_TODO = gql`
mutation createTodo($todoInput: addTodo) {
  createTodo(todoInput: $todoInput) {
    id
    label
    todoStatus
    todoActivity {
      id
    }
    description
  }
}
`;

export const ADD_TODO_ACTIVITY = gql`
mutation addTodoActivity ($id: String, $todoActivity:activity) {
  addTodoActivity(id: $id, todoActivity: $todoActivity) {
    id
    label
    status
  }
}
`;

export const UPDATE_TODO = gql`
mutation updateTodo($id: String, $updateInput: addTodo) {
  updateTodo(id: $id, updateInput: $updateInput) {
    id
  }
}
`;

export const DELETE_TODO = gql`
mutation deleteTodo($id: String) {
  deleteTodo(todoId: $id) {
    id
    label
  }
}
`;