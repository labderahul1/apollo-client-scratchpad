// import style from './style';
import InsertTodo from '../../InsertTodo';
import TodoList from '../../../components/TodoList';

const Home = () => (
	<div class="home">
		<InsertTodo />
		<div>
			<TodoList label="Todays Todo" />
		</div>
	</div>
);

export default Home;
