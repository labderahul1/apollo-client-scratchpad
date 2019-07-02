import { graphql } from 'react-apollo';
import { UPDATE_ITEM } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const withUpdateItem = graphql(UPDATE_ITEM, {
	props: ({ mutate }) => {
		return ({
			updateItem: (todoId, itemId, updateVal) => {
				return (
					mutate(
						{
							variables: { todoId, itemId, updateVal },
							optimisticResponse: {
								__typename: 'Mutation',
								updateItem: {
									id: itemId,
									__typename: 'Todo'
								}
							},
							update: (cache, { data: { updateItem } }) => {
								const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
								const todo = getAllTodoList.find((ele) => ele.id === todoId);
								let itemIndex = todo.todoActivity.findIndex((element) => element.id === updateItem.id );
								let itemToUpdate = todo.todoActivity[itemIndex];
								itemToUpdate = { ...itemToUpdate, ...updateVal };
								todo.todoActivity.splice(itemIndex, 1, itemToUpdate);
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

export default withUpdateItem;