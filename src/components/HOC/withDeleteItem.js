import { graphql } from 'react-apollo';
import { DELETE_ITEM } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const withDeleteItem = graphql(DELETE_ITEM, {
	props: ({ mutate }) => {
		return ({
			deleteItem: (todoId, itemId) => {
				return (
					mutate(
						{
							variables: { todoId, itemId },
							optimisticResponse: {
								__typename: 'Mutation',
								deleteItem: {
									id: itemId,
									__typename: 'Todo'
								}
							},
							update: (cache, { data: { deleteItem } }) => {
								const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
								const todo = getAllTodoList.find((ele) => ele.id === todoId);
								let itemIndex = todo.todoActivity.findIndex((element) => element.id === deleteItem.id );
								todo.todoActivity.splice(itemIndex, 1);
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

export default withDeleteItem;