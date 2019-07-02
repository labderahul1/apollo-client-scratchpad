/* eslint-disable react/jsx-no-bind */
import { Component } from 'preact';
import uuid from 'uuid';
import withAddItem from './HOC/withAddItem';

class InsertItem extends Component {
	state= {
		todoItem: {
			itemId: '',
			itemLabel: '',
			status: 'Todo'
		  }
	}

	setActivity = (e) => {
		this.setState({ todoItem: { ...this.state.todoItem, itemId: uuid(), itemLabel: e.target.value } });
	}

	clearActivity = (e) => {
		this.setState({ todoItem: { ...this.state.todoItem, itemId: '', itemLabel: '' } });
	}

	render({ todoId, addTodoItem }, { todoItem }) {
		return (
			<div className="footer">
				<input type="text" placeholder="Add item..."
					onInput={this.setActivity}
					value={todoItem.itemLabel}
					onKeyPress={e => {
						if (e.key === 'Enter' && todoItem.itemLabel) {
							addTodoItem(todoId, todoItem);
							// this.clearActivity();
						}
					}}
				/>
				<button
					onClick={e => {
						addTodoItem(todoId, todoItem);
						this.clearActivity();
					}}
					disabled={!todoItem.itemLabel.trim().length}
				>Add</button>
			</div>
		);
	}
}

export default withAddItem(InsertItem);