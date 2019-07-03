import gql from 'graphql-tag';

export const CREATE_TODO = gql`
mutation createTodo($todoInput: addTodo) {
  createTodo(todoInput: $todoInput) {
    todoId
    todoLabel
    itemsList {
      itemId
    }
  }
}
`;

export const ADD_TODO_ITEM = gql`
mutation insertItem ($todoId: String, $todoItem:addItems) {
  insertItem(todoId: $todoId, todoItem: $todoItem) {
    itemId
    itemLabel
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
mutation deleteTodo($todoId: String) {
  deleteTodo(todoId: $todoId) {
    todoId
  }
}
`;

export const DELETE_ITEM = gql`
mutation deleteItem($todoId: String, $itemId: String) {
  deleteItem(todoId: $todoId, itemId: $itemId) {
    itemId
  }
}
`;

export const UPDATE_ITEM = gql`
mutation updateItem($todoId: String, $itemId: String, $updateVal: addItems) {
  updateItem(todoId: $todoId, itemId: $itemId, updateVal: $updateVal) {
    itemId
  }
}
`;
