import { graphql } from 'react-apollo';
import { CREATE_TODO } from '../../constants/mutuation';
import { GET_ALL_TODO } from '../../constants/queries';

const withCreateTodo = graphql(CREATE_TODO, {
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
						getAllTodoList.push({ ...createTodo });
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
export default withCreateTodo;
