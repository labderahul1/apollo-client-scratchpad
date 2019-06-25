/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Mutation } from 'react-apollo';
import { DELETE_TODO } from '.././constants/mutuation';
import { GET_ALL_TODO } from '.././constants/queries';

export default class TodoHeader extends Component {
	state= {
		id: '100100ss'
	}

	render({ label, todoId }, {}) {
		return (
			<Mutation
				mutation={DELETE_TODO}
			>
				{deleteTodo => {
					console.log();
					return (
						<div className="header">
							{label}
							<i className="action fa fa-trash"
								onClick={e => {
									deleteTodo({ variables: { todoId },
										optimisticResponse: {
											__typename: 'Mutation',
											deleteTodo: {
												id: todoId,
												__typename: 'Todo'
											}
										},
										update: (cache, { data: { deleteTodo } }) => {
											console.log(cache.readQuery({ query: GET_ALL_TODO }));
											const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
											const todoIndex = getAllTodoList.findIndex((ele) => ele.id === deleteTodo.id);
											getAllTodoList.splice(todoIndex, 1);
											cache.writeQuery({
												query: GET_ALL_TODO,
												data: { getAllTodoList }
											});
										}
									});
								}}
							/>
						</div>
					);
				}
				}
			</Mutation>
		);
	}
}