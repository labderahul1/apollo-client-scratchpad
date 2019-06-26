/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { Component } from 'preact';
import DeleteItemMutation from './HOC/DeleteItemMutation';
import UpdateItemMutation from './HOC/UpdateItemMutation';


class TodoItem extends Component {
	state= {
		id: '100100ss'
	}
	

	render({ label, status, todoId, itemId }, {}) {
		return (
			<div className={`item ${status === 'Done' ? 'done disabled' : ''}`}>
				<label className="labelText">{label}</label>
				<div className="actions">
					<div>
						<i className="fa fa-check"
							onClick={() => this.props.updateItem(todoId, itemId, { status: 'Done' })}
						/>
						<i className="fa fa-pen"
							// onClick={() => this.props.setUpdateTodoItem({ id: itemId, label, status })}
						/>
						<i className="fa fa-trash"
							onClick={() => this.props.deleteItem(todoId, itemId)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default UpdateItemMutation(DeleteItemMutation(TodoItem));