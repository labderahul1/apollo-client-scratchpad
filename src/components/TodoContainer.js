/* eslint-disable react/jsx-no-bind */
import { Component } from 'preact';
import uuid from 'uuid';
import TodoHeader from './TodoHeader';
import ItemContainer from './ItemContainer';
import InsertItem from './InsertItem';

class TodoContainer extends Component {
	state= {
		todoItem: {
			itemId: '',
			itemLabel: '',
			status: 'Todo'
		  },
		  isUpdateItem: false
	}

	inputUpdateItemLabel = (_updateObj) => {
		this.setState({ todoItem: { ...this.state.todoItem, ..._updateObj }, isUpdateItem: true });
	}

	intializeInputItemLabel = (e) => {
		if (!this.state.todoItem.itemId)
			this.setState({ todoItem: { ...this.state.todoItem, itemId: uuid() } });
		this.setState({ todoItem: { ...this.state.todoItem, itemLabel: e.target.value } });
	}

	clearInputBox = () => {
		this.setState({ todoItem: { ...this.state.todoItem, itemLabel: '', itemId: '' }, isUpdateItem: false });
	}

	render({ todoId, todoLabel, itemsList }, { todoItem, isUpdateItem }) {
		return (
			<div class="container">
				<TodoHeader todoLabel={todoLabel} todoId={todoId} />
				<div className="content">
					{
						itemsList.map(({ itemId, itemLabel, status }) => (
							<ItemContainer itemLabel={itemLabel}
								inputUpdateItemLabel={this.inputUpdateItemLabel}
								todoId={todoId}
								itemId={itemId}
								status={status}
							/>
						)
						)
					}
				</div>
				<InsertItem
					todoId={todoId}
					todoItem={todoItem}
					intializeInputItemLabel={this.intializeInputItemLabel}
					isUpdateItem={isUpdateItem}
					clearInputBox={this.clearInputBox}
				/>
			</div>
		);
	}
}
export default TodoContainer;
