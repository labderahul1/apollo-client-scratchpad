import { h } from 'preact';
import style from './style';
import TodoInputField from '../../components/TodoInputField';
import TodoMiniList from '../../components/TodoMiniList';

const Home = () => (
	<div class={style.home}>
		<h3>ToDO List</h3>
		<TodoInputField />
		<div>
			<TodoMiniList label="Todays Todo" />
		</div>
	</div>
);

export default Home;
