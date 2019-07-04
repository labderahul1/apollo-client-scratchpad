import { graphql } from 'react-apollo';
import { UPDATE_ITEM } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const withUpdateItem = graphql(UPDATE_ITEM, {
	props: ({ mutate }) => ({
		updateItem: (todoId, itemId, updateVal) => (
			mutate(
				{
					variables: { todoId, itemId, updateVal },
					optimisticResponse: {
						__typename: 'Mutation',
						updateItem: {
							itemId,
							__typename: 'Items'
						}
					},
					update: (cache, { data: { updateItem } }) => {
						const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
						const todo = getAllTodoList.find((ele) => ele.todoId === todoId);
						const itemIndex = todo.itemsList.findIndex((element) => element.itemId === updateItem.itemId );
						let itemToUpdate = todo.itemsList[itemIndex];
						itemToUpdate = { ...itemToUpdate, ...updateVal };
						todo.itemsList.splice(itemIndex, 1, itemToUpdate);
						cache.writeQuery({
							query: GET_ALL_TODO,
							data: { getAllTodoList }
						});
					}
				}
			)
		)
		  })
});
export default withUpdateItem;
