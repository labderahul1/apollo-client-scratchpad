import { h, Component } from 'preact';
import { Query } from 'react-apollo';
import { GET_TODO_BYID } from '../../constants/queries';
import EditTodoForm from './EditTodoForm';

export default class EditTodo extends Component {
	state = {
		id: '66aec3bc-599a-4acc-9278-aa721ee2d10f'
	};

	// Note: `user` comes from the URL, courtesy of our router
	render({ matches: { user } }, { todoId }) {
		return (
			<Query
				query={GET_TODO_BYID}
				variables={{ todoId: user ? user : todoId }}
				fetchPolicy="cache-and-network"
			>
				{
					({ loading, error, data: { getToDoById } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error : (</p>;
						console.log(getToDoById, 'getToDoById');
						return (
							<div>
								<EditTodoForm getToDoById={getToDoById} />
							</div>
						);
					}
				}
	
			</Query>
		);
	}
}
