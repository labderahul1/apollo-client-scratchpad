import { h, Component } from 'preact';
import { Query } from 'react-apollo';
import { GET_TODO_BYID } from '../../../constants/queries';
import style from './style';

export default class Profile extends Component {
	state = {
		todoId: '66aec3bc-599a-4acc-9278-aa721ee2d10f'
	};

	// Note: `user` comes from the URL, courtesy of our router
	render({ matches: { user } }, { todoId }) {
		return (
			<Query
				query={GET_TODO_BYID}
				variables={{ todoId: user ? user : todoId }}
				fetchPolicy="cache-and-network"
			>
				{
					({ loading, error, data: { getToDoById } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error : (</p>;
						return (
							<div>
								{
									<div class={style.profile}>
										<div className="todoBlock todoInDetails alert alert-warning">
											<h4 href="#" class="" onClick={this.detailsTodo}>{getToDoById.label}</h4>
											<p>{getToDoById.description}</p>
										</div>
									</div>
								}
							</div>
						);
					}
				}
	
			</Query>
		);
	}
}
