import { Query } from 'react-apollo';
import { GET_ALL_TODO, EMP_WITH_ID } from '../constants/queries';

const ExchangeRates = () => (
	<Query
		query={GET_ALL_TODO}
		 fetchPolicy="cache-and-network"
	>
		{/* <Query
		query={EMP_WITH_ID}
		variables={{ id: '66aec3bc-599a-4acc-9278-aa721ee2d10f' }}
		 fetchPolicy="cache-and-network"
	> */}
		{({ loading, error, data: { getAllTodoList: empList } }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error : (</p>;
			console.log(empList);
			return (
				<div>
					{
						empList.map(({ id, label }) => (
							<div style={{ margin: '5px 10px' }}>{id}</div>
						))
					}
				</div>
			);

		}}
	</Query>
);

export default ExchangeRates;