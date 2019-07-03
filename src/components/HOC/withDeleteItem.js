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
									itemId,
									__typename: 'Items'
								}
							},
							update: (cache, { data: { deleteItem } }) => {
								const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
								const todo = getAllTodoList.find((ele) => ele.todoId === todoId);
								let itemIndex = todo.itemsList.findIndex((element) => element.itemId === deleteItem.itemId );
								todo.itemsList.splice(itemIndex, 1);
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