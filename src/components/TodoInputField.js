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
		console.log(todoInput.label.length);
		return (
			<Mutation
				mutation={CREATE_TODO}
				update={(cache, { data: { createTodo } }) => {
					const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
					cache.writeQuery({
						query: GET_ALL_TODO,
						data: { getAllTodoList: getAllTodoList.concat([createTodo]) }
					});
			  }}
			>
				{
					(createTodo, { data }) => (
						<div class="container">
							<div class="row">
								<div class="col-md-9">
									<input type="text" value={todoInput.label} onChange={this.setTodotext} class="form-control add-todo" placeholder="Add todo" />
								</div>
								<div class="col-md-3">
									<button id="checkAll" class="btn btn-success"
										onClick={e => {
											createTodo({ variables: { todoInput } });
											this.cleartext();
										  }}
										  disabled={!todoInput.label.length}
									>Add</button>
								</div>
							</div>
						</div>
					)
				}
			</Mutation>
		);
	}
}