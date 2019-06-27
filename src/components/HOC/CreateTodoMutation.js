import { graphql } from 'react-apollo';
import { CREATE_TODO } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const CreateTodoMutation = graphql(CREATE_TODO, {
	props: ({ mutate }) => ({
		createTodo: (todoInput) => (
			mutate(
				{
					variables: { todoInput },
					optimisticResponse: {
						__typename: 'Mutation',
						createTodo: {
							...todoInput,
							__typename: 'Todo'
						}
					},
					update: (cache, { data: { createTodo } }) => {
						const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
						cache.writeQuery({
							query: GET_ALL_TODO,
							data: { getAllTodoList: getAllTodoList.concat([createTodo]) }
						});
					}
				}
			)
		)
		  })
});
export default CreateTodoMutation;