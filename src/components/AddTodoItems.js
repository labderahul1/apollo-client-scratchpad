/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { FaPlus } from 'react-icons/fa';
import { Mutation } from 'react-apollo';
import uuid from 'uuid';
import { ADD_TODO_ACTIVITY } from '../constants/mutuation';
// import { GET_ALL_TODO, GET_TODO_BYID } from '../constants/queries';

export default class AddTodoItems extends Component {
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

	render({ id }, { todoActivity }) {
		return (
			<Mutation
				mutation={ADD_TODO_ACTIVITY}
				// update={(cache, { data: { addTodoActivity } }) => {
				// 	const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
				// 	console.log(getAllTodoList, 'getAllTodoList', addTodoActivity);
				// console.log( cache.readQuery({ query: GET_TODO_BYID, variables: { id } }));
				// 	cache.writeQuery({
				//   query: GET_ALL_TODO,
				//   data: { getAllTodoList: getAllTodoList.concat([addTodoActivity]) }
				// 	});
			//   }}
			>
				{
					(addTodoActivity, { data }) => (
						<div className=" addNotes">
							<div className="input-group">
								<input type="text" className="form-control form-control-sm" placeholder="Add Items..."
									onInput={this.setActivity}
									aria-label="Recipient's username" aria-describedby="basic-addon2"
								/>
								<div className="input-group-append">
									<a class="plusIcon" style={{ pointerEvents: todoActivity.label.length ? '' : 'none' }}
										data-dismiss="alert"
										aria-label="close"
										onClick={e => {
											addTodoActivity({ variables: { id, todoActivity } });
										}}
									><FaPlus color={todoActivity.label.length ? 'blue' : 'grey'} />
									</a>
								</div>
							</div>
						</div>
					)
				}
			</Mutation>
		);
	}
}