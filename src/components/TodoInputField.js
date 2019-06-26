/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import uuid from 'uuid';
import { Mutation } from 'react-apollo';
import { CREATE_TODO } from '../constants/mutuation';
import { GET_ALL_TODO } from '../constants/queries';

export default class TodoInputField extends Component {
	state= {
		todoInput: {
			id: '',
			label: '',
			todoActivity: [],
			todoStatus: 'Done',
			description: 'By Default Description'
		  }
	}

	setTodotext = (e) => {
		this.setState({ todoInput: { ...this.state.todoInput, id: uuid(), label: e.target.value } });
	}

	cleartext = (e) => {
		this.setState({ todoInput: { ...this.state.todoInput, id: '', label: '' } });
	}
	
	render({},  { todoInput }) {
		return (
			<Mutation
				mutation={CREATE_TODO}
			>
				{createTodo => {
					console.log();
					return (
						<div>
							<input type="text" value={todoInput.label} onInput={this.setTodotext} 
								onKeyPress={e => {
									if (e.key === 'Enter') {
										createTodo({ variables: { todoInput },
											optimisticResponse: {
												__typename: 'Mutation',
												createTodo: {
													...todoInput,
													__typename: 'Todo'
												}
											},
											update: (cache, { data: { createTodo } }) => {
												const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
												cache.writeQuery({
													query: GET_ALL_TODO,
													data: { getAllTodoList: getAllTodoList.concat([createTodo]) }
												});
											}
										});
										this.cleartext();
									}
								}}
								class="form-control add-todo" placeholder="Add todo..."
							/>
							<button id="checkAll" class="btn btn-success"
								onClick={e => {
									createTodo({ variables: { todoInput },
										optimisticResponse: {
											__typename: 'Mutation',
											createTodo: {
												...todoInput,
												__typename: 'Todo'
											}
										},
										update: (cache, { data: { createTodo } }) => {
											const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
											cache.writeQuery({
												query: GET_ALL_TODO,
												data: { getAllTodoList: getAllTodoList.concat([createTodo]) }
											});
										}
									});
									this.cleartext();
								}}
								disabled={!todoInput.label.length}
							>Add</button>
						</div>
					)}}
			</Mutation>
		);
	}
}