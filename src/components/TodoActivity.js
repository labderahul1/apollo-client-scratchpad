/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';

export default class TodoActivity extends Component {
	state= {
		id: '100100ss'
	}

	render({ label, color, status }, {}) {
		return (
			<div>
				{
					status === 'Done' ?
						<strike>{label}</strike>
						:
						<span>{label}</span>
				}
				<span className="totoActivityStatus" style={{ background: color }} />
			</div>
		);
	}
}