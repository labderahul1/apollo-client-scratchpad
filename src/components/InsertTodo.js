/* eslint-disable react/jsx-no-bind */
import { Component } from 'preact';
import uuid from 'uuid';
import withCreateTodo from './HOC/withCreateTodo';

class InsertTodo extends Component {
	state= {
		todoInput: {
			todoId: '',
			todoLabel: '',
			itemsList: []
		  }
	}

	initializeTodoInput = (e) => this.setState({ todoInput: { ...this.state.todoInput, todoId: uuid(), todoLabel: e.target.value } });

	clearTodoInputBox = (e) => this.setState({ todoInput: { ...this.state.todoInput, todoId: '', todoLabel: '' } });
	
	render({ createTodo },  { todoInput: { todoLabel }, todoInput }) {
		return (
			<div>
				<input type="text" value={todoLabel} onInput={this.initializeTodoInput}
					onKeyPress={e => {
						if (e.key === 'Enter' && todoLabel) {
							createTodo(todoInput);
							this.clearTodoInputBox();
						}
					}}
					class="form-control add-todo" placeholder="Add todo..."
				/>
				<button id="checkAll" class="btn btn-success"
					onClick={e => {
						createTodo(todoInput);
						this.clearTodoInputBox();
					}}
					disabled={!todoLabel.trim().length}
				>Add</button>
			</div>
		);
	}
}

export default withCreateTodo(InsertTodo);
