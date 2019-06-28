/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { Component } from 'preact';
import uuid from 'uuid';
import CreateTodoMutation from './HOC/CreateTodoMutation';
class TodoInputField extends Component {
	state= {
		todoInput: {
			id: '',
			label: '',
			todoActivity: [],
			todoStatus: 'Done',
			description: 'By Default Description'
		  }
	}

	setTodotext = (e) => this.setState({ todoInput: { ...this.state.todoInput, id: uuid(), label: e.target.value } });

	cleartext = (e) => this.setState({ todoInput: { ...this.state.todoInput, id: '', label: '' } });
	
	render({},  { todoInput }) {
		return (
			<div>
				<input type="text" value={todoInput.label} onInput={this.setTodotext} 
					onKeyPress={e => {
						if (e.key === 'Enter' && todoInput.label) {
							this.props.createTodo(todoInput);
							this.cleartext();
						}
					}}
					class="form-control add-todo" placeholder="Add todo..."
				/>
				<button id="checkAll" class="btn btn-success"
					onClick={e => {
						this.props.createTodo(todoInput);
						this.cleartext();
					}}
					disabled={!todoInput.label.length}
				>Add</button>
			</div>
		);
	}
}

export default CreateTodoMutation(TodoInputField);