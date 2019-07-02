import { graphql } from 'react-apollo';
import { ADD_TODO_ACTIVITY } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const withAddItem = graphql(ADD_TODO_ACTIVITY, {
	props: ({ mutate }) => {
		return ({
			addTodoItem: (todoId, todoItem) => {
				return (
					mutate(
						{
							variables: { todoId, todoItem },
							optimisticResponse: {
								__typename: 'Mutation',
								addTodoActivity: {
									todoId,
									todoItem,
									__typename: 'Todo'
								}
							},
							update: (cache, { data: { addTodoActivity: { todoId, todoItem } } }) => {
								// console.log(todoId, todoItem, 'addTodoActivity');
								const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
								const todo = getAllTodoList.find((ele) => ele.todoId === todoId);
								todo.itemsList.push(todoItem);
								cache.writeQuery({
									query: GET_ALL_TODO,
									data: { getAllTodoList }
								});
						  }
						}
					)
				);
			}
		  });
	}
});

export default withAddItem;