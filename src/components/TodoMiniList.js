
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Query } from 'react-apollo';
import { route } from 'preact-router';
import { FaEdit, FaWindowClose, FaPlus } from 'react-icons/fa';
import { GET_ALL_TODO } from '../constants/queries';
import TodoActivity from './TodoActivity';
import AddActivity from './AddActivity';
import { DELETE_TODO } from '.././constants/mutuation';

export default class TodoMiniList extends Component {
	state= {
		todoInput: {
			id: '100100ss',
			label: 'todoNamwe',
			todoStatus: 'Done',
			description: 'shssahj'
		  }
	}

	deleteTodo = (e) => {
		console.log('hello');
	};

	detailsTodo = (id) => {
		console.log(id, 'id');
		route(`/profile/${id}`, id);
	};

	editTodo = (id) => {
		console.log(id, 'id');
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
						// console.log(todoList, 'todoList');
						return (
							<div>
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
												<AddActivity id={id} />
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