/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';

export default class TodoItem extends Component {
	state= {
		id: '100100ss'
	}

	render({ label, color, status }, {}) {
		return (
			<div className={`item ${status === 'Done' ? 'done disabled' : ''}`}>
				{label}
				<div className="actions">
					<i className="fa fa-check" />
					<i className="fa fa-pen" />
					<i className="fa fa-trash" />
				</div>
			</div>
		);
	}
}