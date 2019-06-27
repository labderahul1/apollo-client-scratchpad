
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Query } from 'react-apollo';
import { route } from 'preact-router';
import { GET_ALL_TODO } from '../constants/queries';
import TodoBlock from './TodoBlock';

export default class TodoMiniList extends Component {
	state= {
		todoItem: {
			id: '',
			label: '',
			status: 'Todo'
		  }
	}

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
										<TodoBlock
											id={id}
											label={label}
											 todoActivity={todoActivity}
										/>
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