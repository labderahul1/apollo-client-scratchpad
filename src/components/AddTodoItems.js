/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { Mutation } from 'react-apollo';
import uuid from 'uuid';
import { ADD_TODO_ACTIVITY } from '../constants/mutuation';
import { GET_ALL_TODO } from '../constants/queries';

export default class AddTodoItems extends Component {
	state= {
		id: '4a8e7328-8221-4322-959b-e05d62aa40a9',
		todoActivity: {
			id: '',
			label: '',
			status: 'Todo'
		  }
	}

	setActivity = (e) => {
		this.setState({ todoActivity: { ...this.state.todoActivity, id: uuid(), label: e.target.value } });
	}

	clearActivity = (e) => {
		this.setState({ todoActivity: { ...this.state.todoActivity, id: '', label: '' } });
	}

	render({ id }, { todoActivity }) {
		return (
			<Mutation
				mutation={ADD_TODO_ACTIVITY}
				update={(cache, { data: { addTodoActivity } }) => {
					const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
					const todo = getAllTodoList.find((ele) => ele.id === id);
					todo.todoActivity.push(addTodoActivity);
					console.log('Mutation: ', getAllTodoList);
					cache.writeQuery({
						query: GET_ALL_TODO,
						data: { getAllTodoList }
					});
			  }}
			>
				{
					(addTodoActivity, { data }) => (
						<div className="footer">
							<input type="text" placeholder="Add item..."
								onInput={this.setActivity}
								value={todoActivity.label}
								onKeyPress={e => {
									if (e.key === 'Enter') {
										addTodoActivity({ variables: { id, todoActivity } });
										this.clearActivity();
									}
								}}
							/>
							<button
								onClick={e => {
									addTodoActivity({ variables: { id, todoActivity } });
									this.clearActivity();
								}}
								disabled={!todoActivity.label.length}
							>Add</button>
						</div>
					)
				}
			</Mutation>
		);
	}
}