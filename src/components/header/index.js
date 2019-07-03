import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Todo List</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
		</nav>
	</header>
);

export default Header;
