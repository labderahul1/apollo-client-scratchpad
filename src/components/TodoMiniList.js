
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Query } from 'react-apollo';
import { route } from 'preact-router';
import { GET_ALL_TODO } from '../constants/queries';
import TodoItem from './TodoItem';
import AddTodoItems from './AddTodoItems';
import UpdateTodoItems from './UpdateTodoItems';
import TodoHeader from './TodoHeader';

export default class TodoMiniList extends Component {
	state= {
		todoItem: {
			id: '',
			label: '',
			status: 'Todo'
		  }
	}

	// setUpdateTodoItem = (_updateObj) => {
	// 	this.setState({ todoItem: { ...this.state.todoItem, ..._updateObj } });
	// 	// console.log('setUpdateTodoItem', this.state);
	// }

	detailsTodo = (id) => {
		route(`/profile/${id}`, id);
	};

	editTodo = (id) => {
		route(`/edit/${id}`, id);
	};

	deleteTodo = (id) => {
		console.log('Delete Todo');
	};

	render({}, { todoItem }) {
		return (
			<Query
				query={GET_ALL_TODO}
				fetchPolicy="cache-and-network"
			>
				{
					({ loading, error, data: { getAllTodoList: todoList }, refetch  }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error : (</p>;
						return (
							<div className="row">
								{
									todoList.map(({ id, label, todoActivity }) => (
										<div class="container">
											<TodoHeader label={label} todoId={id} />
											<div className="content">
												
												{
													todoActivity.map((act, i) => (
														<TodoItem label={act.label}
															setUpdateTodoItem={this.setUpdateTodoItem}
															todoId={id}
															itemId={act.id}
															status={act.status}
														/>
													)
													)
												}
											</div>
											<AddTodoItems id={id} />
										</div>
									))
								}
							</div>
						);
					}
				}
	
			</Query>
		);
	}
}