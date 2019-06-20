
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';

export default class RadioGroup extends Component {
	state= {
		todoInput: {
			
		  }
	}
	

	render({ value, id, todoId, status, updateActivityLabel }, {}) {
		return (
			<div>
				<input onChange={(e) => updateActivityLabel(e, id, 'label')} className="editInput form-control add-todo" type="text" value={value} />
				<div>

					<div>
						<div className="custom-control custom-radio custom-control-inline">
							<label className="" for="male">Done</label>
							<input type="radio" name={`activity_${id}`} id={`done_${id}`} value="Done"
								checked={status === 'Done'}
								onChange={(e) => updateActivityLabel(e, id, 'status')}
							/>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<label className="" for="female">WIP</label>
							<input type="radio" name={`activity_${id}`} id={`wip_${id}`} value="WIP"
								checked={status === 'WIP'}
								onChange={(e) => updateActivityLabel(e, id, 'status')}
							/>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<label className="" for="other">Todo</label>
							<input type="radio" name={`activity_${id}`} id={`todo_${id}`} value="Todo"
								checked={status === 'Todo'}
								onChange={(e) => updateActivityLabel(e, id, 'status')}
							/>
						</div>
					</div>

					{/* <div className="custom-control custom-radio custom-control-inline">
						<input type="radio" className="custom-control-input" id={`done_${id}`}
							value="Done"
							name={`activity_${id}`}
							checked={status === 'Done'}
						/>
						<label className="custom-control-label" for="defaultInline1">Done</label>
					</div>

					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" className="custom-control-input" id={`wip_${id}`}
							value="WIP"
							name={`activity_${id}`}
							checked={status === 'WIP'}
						/>
						<label className="custom-control-label" for="defaultInline2">WIP</label>
					</div>

					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" className="custom-control-input" id={`todo_${id}`}
							value="Todo"
							name={`activity_${id}`}
							checked={status === 'Todo'}
						/>
						<label className="custom-control-label" for="defaultInline3">Todo</label>
					</div> */}
				</div>
			</div>
		);
	}
}