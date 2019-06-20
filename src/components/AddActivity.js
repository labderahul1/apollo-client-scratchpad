/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import { h, Component } from 'preact';
import { FaPlus } from 'react-icons/fa';
import { Mutation } from 'react-apollo';
import uuid from 'uuid';
import { ADD_TODO_ACTIVITY } from '../constants/mutuation';
import { GET_ALL_TODO } from '../constants/queries';

export default class AddActivity extends Component {
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
			// 	update={(cache, { data: { addTodoActivity } }) => {
			// 		const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
			// 		console.log(getAllTodoList, 'getAllTodoList', id);
			// 		cache.writeQuery({
			// 	  query: GET_ALL_TODO,
			// 	  data: { getAllTodoList: getAllTodoList.concat([addTodoActivity]) }
			// 		});
			//   }}
			>
				{
					(addTodoActivity, { data }) => (
						<div className=" addNotes">
							<input style={{ width: '100px' }} cols="20" onChange={this.setActivity} />
							<a class="plus" style={{ display: 'inline-block' }} data-dismiss="alert" aria-label="close"
								onClick={e => {
									addTodoActivity({ variables: { id, todoActivity } });
								  }}
							><FaPlus />
							</a>
						</div>
					)
				}
			</Mutation>
		);
	}
}