/* eslint-disable react/jsx-no-bind */
import { Component } from 'preact';
import { Mutation } from 'react-apollo';
import { DELETE_TODO } from '.././constants/mutuation';
import { GET_ALL_TODO } from '.././constants/queries';

class TodoHeader extends Component {
	state={

	}
	render({ todoLabel, todoId }, {}) {
		return (
			<Mutation
				mutation={DELETE_TODO}
			>
				{
					deleteTodo => {
						return (
							<div className="header">
								<label>{todoLabel}</label>
								<i className="action fa fa-trash"
									onClick={e => {
										deleteTodo({ variables: { todoId },
											optimisticResponse: {
												__typename: 'Mutation',
												deleteTodo: {
													todoId,
													__typename: 'Todo'
												}
											},
											update: (cache, { data: { deleteTodo } }) => {
												const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
												const todoIndex = getAllTodoList.findIndex((ele) => ele.todoId === deleteTodo.todoId);
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
export default TodoHeader;
