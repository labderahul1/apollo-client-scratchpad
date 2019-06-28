/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { Component } from 'preact';
import { Mutation } from 'react-apollo';
import { DELETE_TODO } from '.././constants/mutuation';
import { GET_ALL_TODO } from '.././constants/queries';

export default class TodoHeader extends Component {
	render({ label, todoId }, {}) {
		return (
			<Mutation
				mutation={DELETE_TODO}
			>
				{deleteTodo => {
					console.log();
					return (
						<div className="header">
							<label>{label}</label>
							<i className="action fa fa-trash"
								onClick={e => {
									deleteTodo({ variables: { id: todoId },
										optimisticResponse: {
											__typename: 'Mutation',
											deleteTodo: {
												id: todoId,
												__typename: 'Todo'
											}
										},
										update: (cache, { data: { deleteTodo } }) => {
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