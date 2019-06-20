import { h, Component } from 'preact';
import { route } from 'preact-router';
import RadioGroup from '../../components/RadioGroup';
import style from './style';
import { Mutation } from 'react-apollo';
import { UPDATE_TODO } from '../../constants/mutuation';

export default class EditTodoForm extends Component {
	// eslint-disable-next-line react/sort-comp
	constructor(props) {
		super(props);
		this.state= {
			todoData: {
				id: '66aec3bc-599a-4acc-9278-aa721ee2d10f',
				label: 'Rahul Labde',
				todoActivity: [
					{
						id: '12345',
						label: 'dddd',
						status: 'Done'
					},
					{
						id: '123456',
						label: 'kkkk',
						status: 'Todo'
					}
				],
				description: 'Task1 desc',
				todoStatus: 'Todo'
			}
			// todoData: this.props.getToDoById
		};
	}

	editTodoDataLabel = (e) => {
		this.setState({ todoData: { ...this.state.todoData, label: e.target.value } });
	}

	updateActivityLabel = (e, itemId, _key) => {
		let newState = Object.assign({}, this.state);
		const todoIndex = newState.todoData.todoActivity.findIndex((element) => element.id === itemId );
		newState.todoData.todoActivity[todoIndex][_key] = e.target.value;
		this.setState(newState);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ }, { todoData: { id, label, todoActivity }, todoData }) {
		return (
			<Mutation
				mutation={UPDATE_TODO}
			>
				{
					(updateTodo, { data }) => (
						<div>
							<div class={style.profile}>
								<h4>Update Todo</h4>
								<div className="todoInDetails alert alert-warning">
									<input type="text" value={label} class="form-control add-todo"
										onChange={this.editTodoDataLabel}
									/>
									<br />
									{
										todoActivity.map((act, i) => (
											<div>
												<RadioGroup value={act.label} id={act.id} status={act.status}
													updateActivityLabel={this.updateActivityLabel}
												/>
												<br />
											</div>
										)
										)
									}
									
									<br />
									<button id="checkAll" className="btn btn-success"
										// eslint-disable-next-line react/jsx-no-bind
										onClick={e => {
											// console.log({ id, updateInput: todoData });
											updateTodo({ variables: { id, updateInput: todoData } });
											route('/home');
										}}
									>Update</button>
								</div>
							</div>
						</div>
					)
				}
			</Mutation>
		);
					
	}
}
