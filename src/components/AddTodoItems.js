/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { Component } from 'preact';
import uuid from 'uuid';
import AddItemMutation from '../components/HOC/AddItemMutation';

class AddTodoItems extends Component {
	state= {
		id: '4a8e7328-8221-4322-959b-e05d62aa40a9',
		todoActivity: {
			id: '',
			label: '',
			status: 'Todo'
		  }
	}

	setActivity = (e) => {
		this.setState({ todoActivity: { ...this.state.todoActivity, id: uuid(), label: e.target.value } });
	}

	clearActivity = (e) => {
		this.setState({ todoActivity: { ...this.state.todoActivity, id: '', label: '' } });
	}

	render({ id }, { todoActivity }) {
		return (
			<div className="footer">
				<input type="text" placeholder="Add item..."
					onInput={this.setActivity}
					value={todoActivity.label}
					onKeyPress={e => {
						if (e.key === 'Enter' && todoActivity.label) {
							this.props.addTodoItem(id, todoActivity);
							this.clearActivity();
						}
					}}
				/>
				<button
					onClick={e => {
						this.props.addTodoItem(id, todoActivity);
						this.clearActivity();
					}}
					disabled={!todoActivity.label.length}
				>Add</button>
			</div>
		);
	}
}

export default AddItemMutation(AddTodoItems);