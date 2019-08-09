import { Component } from 'preact';
import uuid from 'uuid';
import TodoHeader from './TodoHeader';
import Item from './Item';
import InsertItem from './InsertItem';
import withAddItem from './HOC/withAddItem';
import withDeleteItem from './HOC/withDeleteItem';
import withUpdateItem from './HOC/withUpdateItem';

class TodoContainer extends Component {
	state= {
		todoItem: {
			itemId: '',
			itemLabel: '',
			status: 'Todo'
		  },
		  isUpdateItem: false
	}

	intializeInputItemLabel = (_updateObj) => this.setState({ todoItem: { ...this.state.todoItem, ..._updateObj }, isUpdateItem: true });

	updateInputField = (e) => this.setState({ todoItem: { ...this.state.todoItem, itemLabel: e.target.value } });

	clearInputBox = () => this.setState({ todoItem: { ...this.state.todoItem, itemLabel: '', itemId: '' }, isUpdateItem: false });

	addUpdateBtnAction = (e) => {
		if (!this.state.todoItem.itemId)
			this.setState({ todoItem: { ...this.state.todoItem, itemId: uuid() } });
		const { isUpdateItem, todoItem: { itemLabel, itemId }, todoItem } = this.state;
		const { addTodoItem, updateItem, todoId } = this.props;
		if ((e.key === 'Enter' || e.type === 'click') && itemLabel) {
			!isUpdateItem ? addTodoItem(todoId, todoItem) :	updateItem(todoId, itemId, { itemLabel });
			this.clearInputBox();
		}
	}

	completeTodoItem = (_itemId) => {
		const { updateItem, todoId } = this.props;
		updateItem(todoId, _itemId, { status: 'Done' });
		this.clearInputBox();
	}

	deleteTodoItem = (_itemId) => {
		const { deleteItem, todoId } = this.props;
		window.confirm('Are You Sure?') ? deleteItem(todoId, _itemId) : '';
		this.clearInputBox();
	}

	render({ todoId, todoLabel, itemsList }, { todoItem: { itemLabel: inputText }, isUpdateItem }) {
		return (
			<div class="container">
				<TodoHeader todoLabel={todoLabel} todoId={todoId} />
				<div className="content">
					{
						itemsList.map(({ itemId, itemLabel, status }) => (
							<Item
								intializeInputItemLabel={this.intializeInputItemLabel}
								completeTodoItem={this.completeTodoItem}
								deleteTodoItem={this.deleteTodoItem}
								itemLabel={itemLabel}
								itemId={itemId}
								status={status}
							/>
						)
						)
					}
				</div>
				<InsertItem
					addUpdateBtnAction={this.addUpdateBtnAction}
					disabled={!inputText.trim().length}
					inputText={inputText}
					btnLabel={isUpdateItem ? 'Update' : 'Add'}
					updateInputField={this.updateInputField}
				/>
			</div>
		);
	}
}
export default withDeleteItem(withUpdateItem(withAddItem(TodoContainer)));
