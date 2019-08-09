import { Component } from 'preact';
import uuid from 'uuid';
import withCreateTodo from './HOC/withCreateTodo';

class CreateTodo extends Component {
	state= {
		todoInput: {
			todoId: '',
			todoLabel: '',
			itemsList: []
		  }
	}

	initializeTodoInput = (e) => this.setState({ todoInput: { ...this.state.todoInput, todoLabel: e.target.value } });

	clearTodoInputBox = (e) => this.setState({ todoInput: { ...this.state.todoInput, todoId: '', todoLabel: '' } });

	insertTodo = (e) => {
		if ((e.key === 'Enter' || e.type === 'click') && this.state.todoInput.todoLabel) {
			this.setState({ todoInput: { ...this.state.todoInput, todoId: uuid() } });
			const { createTodo } = this.props;
			const { todoInput } = this.state;
			createTodo(todoInput);
			this.clearTodoInputBox();
		}
	}
	
	render({ Null },  { todoInput: { todoLabel } }) {
		return (
			<div>
				<input type="text" value={todoLabel} onInput={this.initializeTodoInput}
					onKeyPress={this.insertTodo}
					class="form-control add-todo" placeholder="Add todo..."
				/>
				<button id="checkAll" class="btn btn-success"
					onClick={this.insertTodo}
					disabled={!todoLabel.trim().length}
				>Add</button>
			</div>
		);
	}
}

export default withCreateTodo(CreateTodo);
