/* eslint-disable react/jsx-no-bind */
import withDeleteItem from './HOC/withDeleteItem';
import withUpdateItem from './HOC/withUpdateItem';

const ItemContainer = ({ itemLabel, status, todoId, itemId }, {}) => (
	<div className={`item ${status === 'Done' ? 'done disabled' : ''}`}>
		<label className="labelText">{itemLabel}</label>
		<div className="actions">
			<div>
				<i className="fa fa-check"
					onClick={() => this.props.updateItem(todoId, itemId, { status: 'Done' })}
				/>
				<i className="fa fa-pen"
					onClick={() => this.props.setUpdateTodoItem({ id: itemId, itemLabel, status })}
				/>
				<i className="fa fa-trash"
					onClick={() => window.confirm('Are You Sure?') ? this.props.deleteItem(todoId, itemId) : ''}
				/>
			</div>
		</div>
	</div>
);

export default withUpdateItem(withDeleteItem(ItemContainer));
