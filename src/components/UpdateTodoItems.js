/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { Component } from 'preact';
import uuid from 'uuid';

export default class UpdateTodoItems extends Component {
	state= {
		id: '4a8e7328-8221-4322-959b-e05d62aa40a9',
		todoActivity: this.props.todoItem
	}

	setActivity = (e) => {
		this.setState({ todoActivity: { ...this.state.todoActivity, id: uuid(), label: e.target.value } });
	}

	clearActivity = (e) => {
		this.setState({ todoActivity: { ...this.state.todoActivity, id: '', label: '' } });
	}

	render({ id, todoItem }, { todoActivity }) {
		return (
			<div className="footer">
				<input type="text" placeholder="Add item..."
					onInput={this.setActivity}
					value={todoActivity.label}
				/>
				<button
					disabled={!todoActivity.label.length}
				>Update</button>
			</div>
		);
	}
}