/* eslint-disable react/jsx-no-bind */
import { Component } from 'preact';
import TodoHeader from './TodoHeader';
import ItemContainer from './ItemContainer';
import InsertItem from './InsertItem';

class TodoContainer extends Component {
	state= {
		todoItem: {
			itemId: '',
			itemLabel: '',
			status: 'Todo'
		  }
	}

	setUpdateTodoItem = (_updateObj) => {
		this.setState({ todoItem: { ...this.state.todoItem, ..._updateObj } });
	}

	clearUpdateData = () => {
		this.setState({ todoItem: { ...this.state.todoItem, itemLabel: '', itemId: '' } });
	}

	render({ todoId, todoLabel, itemsList }, { todoItem: { itemId, itemLabel, status }, todoItem }) {
		return (
			<div class="container">
				<TodoHeader todoLabel={todoLabel} todoId={todoId} />
				<div className="content">
					{
						itemsList.map(({ itemId, itemLabel, status }) => (
							<ItemContainer itemLabel={itemLabel}
								setUpdateTodoItem={this.setUpdateTodoItem}
								todoId
								itemId={itemId}
								status={status}
							/>
						)
						)
					}
				</div>
				<InsertItem todoId={todoId} />
			</div>
		);
	}
}

export default TodoContainer;