import { graphql } from 'react-apollo';
import { ADD_TODO_ITEM } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const withAddItem = graphql(ADD_TODO_ITEM, {
	props: ({ mutate }) => {
		return ({
			addTodoItem: (todoId, todoItem) => {
				return (
					mutate(
						{
							variables: { todoId, todoItem },
							optimisticResponse: {
								__typename: 'Mutation',
								insertItem: {
									...todoItem,
									__typename: 'Items'

								}
							},
							update: (cache, { data: { insertItem } }) => {
								const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
								const todo = getAllTodoList.find((ele) => ele.todoId === todoId);
								todo.itemsList.push(insertItem);
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