/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { Component } from 'preact';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import AddTodoItems from './AddTodoItems';
import UpdateTodoItems from './UpdateTodoItems';

class TodoBlock extends Component {
	state= {
		id: '4a8e7328-8221-4322-959b-e05d62aa40a9',
		todoItem: {
			id: '',
			label: '',
			status: 'Todo'
		  }
	}

	setUpdateTodoItem = (_updateObj) => {
		this.setState({ todoItem: { ...this.state.todoItem, ..._updateObj } });
	}

	clearUpdateData = () => {
		this.setState({ todoItem: { ...this.state.todoItem, label: '', id: '' } });
	}

	render({ id, label, todoActivity }, { todoItem }) {
		return (
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
				{
					!todoItem.label.length ?
						<AddTodoItems id={id} />
						:
						<UpdateTodoItems id={id} todoItem={todoItem}
							clearUpdateData={this.clearUpdateData}
						/>
				}
			</div>
		);
	}
}

export default TodoBlock;