import { Query } from 'react-apollo';
import { GET_ALL_TODO } from '../constants/queries';
import TodoContainer from './TodoContainer';
import Error from './Error';

const TodoList = () => (
	<Query
		query={GET_ALL_TODO}
		fetchPolicy="cache-and-network"
	>
		{
			({ loading, error, data: { getAllTodoList: todoList } }) => (
				loading || error ? <Error loading={loading} error={error} /> :
					<div className="row">
						{
							todoList.map(({ todoId, todoLabel, itemsList }, i) => (
								<TodoContainer
									todoId={todoId}
									todoLabel={todoLabel}
									itemsList={itemsList}
								/>
							))
						}
					</div>
			)
		}

	</Query>
);
export default TodoList;
