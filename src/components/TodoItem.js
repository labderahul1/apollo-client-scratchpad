/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Mutation } from 'react-apollo';
import { DELETE_ITEM } from '.././constants/mutuation';
import { GET_ALL_TODO } from '.././constants/queries';


export default class TodoItem extends Component {
	state= {
		id: '100100ss'
	}

	render({ label, color, status, todoId, itemId }, {}) {
		return (
			<Mutation
				mutation={DELETE_ITEM}
			>{
					deleteItem => {
						console.log();
						return (
							<div className={`item ${status === 'Done' ? 'done disabled' : ''}`}>
								<label className="labelText">{label}</label>
								<div className="actions">
									<div>
										<i className="fa fa-check" />
										<i className="fa fa-pen" />
										<i className="fa fa-trash"
											onClick={e => {
												deleteItem({ variables: { todoId, itemId },
													update: (cache, { data: { deleteItem } }) => {
														const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
														const todo = getAllTodoList.find((ele) => ele.id === todoId);
														let itemIndex = todo.todoActivity.findIndex((element) => element.id === deleteItem.id );
														todo.todoActivity.splice(itemIndex, 1);
														cache.writeQuery({
															query: GET_ALL_TODO,
															data: { getAllTodoList }
														});
													}
											 });
											}}
										/>
									</div>
								</div>
							</div>
						);
					}
				}
			</Mutation>
		);
	}
}