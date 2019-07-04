import { Component } from 'preact';
import { Mutation } from 'react-apollo';
import { DELETE_TODO } from '.././constants/mutuation';
import { GET_ALL_TODO } from '.././constants/queries';

class TodoHeader extends Component {
	deleteTodoBlock = (deleteTodo) => {
		const { todoId } = this.props;
		deleteTodo({ variables: { todoId },
			optimisticResponse: {
				__typename: 'Mutation',
				deleteTodo: {
					todoId,
					__typename: 'Todo'
				}
			},
			update: (cache, { data: { deleteTodo } }) => {
				const { getAllTodoList } = cache.readQuery({ query: GET_ALL_TODO });
				const todoIndex = getAllTodoList.findIndex((ele) => ele.todoId === deleteTodo.todoId);
				getAllTodoList.splice(todoIndex, 1);
				cache.writeQuery({
					query: GET_ALL_TODO,
					data: { getAllTodoList }
				});
			}
		});
	}
	
	render({ todoLabel, todoId }, {}) {
		return (
			<Mutation
				mutation={DELETE_TODO}
			>
				{
					deleteTodo => {
						return (
							<div className="header">
								<label>{todoLabel}</label>
								<i className="action fa fa-trash"
									onClick={() => this.deleteTodoBlock(deleteTodo)}
								/>
							</div>
						);
					}
				}
			</Mutation>
		);
	}
}
export default TodoHeader;
