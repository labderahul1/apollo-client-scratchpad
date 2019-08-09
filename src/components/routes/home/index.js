import CreateTodo from '../../CreateTodo';
import TodoList from '../../../components/TodoList';

const Home = () => (
	<div class="home">
		<CreateTodo />
		<div>
			<TodoList label="Todays Todo" />
		</div>
	</div>
);

export default Home;
