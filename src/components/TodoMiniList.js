
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Query } from 'react-apollo';
import { route } from 'preact-router';
import { FaEdit } from 'react-icons/fa';
import { GET_ALL_TODO } from '../constants/queries';
import TodoActivity from './TodoActivity';
import AddTodoItems from './AddTodoItems';

export default class TodoMiniList extends Component {
	state= {
		todoInput: {
			id: '100100ss',
			label: 'todoNamwe',
			todoStatus: 'Done',
			description: 'shssahj'
		  }
	}

	detailsTodo = (id) => {
		route(`/profile/${id}`, id);
	};

	editTodo = (id) => {
		route(`/edit/${id}`, id);
	};

	updateActivityColor = (status) => {
		switch (status) {
			case 'Todo': return 'red';
			case 'Done': return 'green';
			case 'WIP': return 'yellow';
			default: return 'black';
		}
	}

	render() {
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
									todoList.map(({ id, label, description, todoActivity }) => (
										<div className="todoBlock alert alert-warning">
											<a class="edit editNotes" data-dismiss="alert"
												onClick={() => this.editTodo(id)}
											><FaEdit />
											</a>
											<a href="#" class="" onClick={() => this.detailsTodo(id)}>{label}</a>
											<div>
												{
													todoActivity.map((act, i) => (
														<TodoActivity label={act.label}
															status={act.status}
															color={this.updateActivityColor(act.status)}
														/>
													)
													)
												}
												<AddTodoItems id={id} />
											</div>
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