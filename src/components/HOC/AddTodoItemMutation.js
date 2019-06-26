import { graphql } from 'react-apollo';
import { ADD_TODO_ACTIVITY } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const AddTodoItemMutation = graphql(ADD_TODO_ACTIVITY, {
	props: ({ mutate }) => {
		return ({
			addTodoItem: (id, todoActivity) => {
				return (
					mutate(
						{
							variables: { id, todoActivity },
							optimisticResponse: {
								__typename: 'Mutation',
								addTodoActivity: {
									id,
									...todoActivity,
									__typename: 'Todo'
								}
							},
							update: (cache, { data: { addTodoActivity } }) => {
								const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
								const todo = getAllTodoList.find((ele) => ele.id === id);
								todo.todoActivity.push(addTodoActivity);
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

export default AddTodoItemMutation;