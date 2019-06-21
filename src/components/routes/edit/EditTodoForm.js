import { h, Component } from 'preact';
import { route } from 'preact-router';
import RadioGroup from '../../../components/RadioGroup';
import style from './style';
import { Mutation } from 'react-apollo';
import { UPDATE_TODO } from '../../../constants/mutuation';

export default class EditTodoForm extends Component {
	// eslint-disable-next-line react/sort-comp
	constructor(props) {
		super(props);
		this.state= {
			todoData: this.props.getToDoById
		};
		this.removeCacheData();
	}

	removeCacheData = () => {
		let newState = Object.assign({}, this.state);
		delete newState.todoData.__typename;
		newState.todoData.todoActivity.forEach((ele) =>  delete ele.__typename );
		this.setState(newState);
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
	render({}, { todoData: { id, label, todoActivity }, todoData }) {
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
