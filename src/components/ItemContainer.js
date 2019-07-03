/* eslint-disable react/jsx-no-bind */
import withDeleteItem from './HOC/withDeleteItem';
import withUpdateItem from './HOC/withUpdateItem';

const ItemContainer = ({ itemLabel, status, todoId, itemId, deleteItem, updateItem, inputUpdateItemLabel, clearInputBox }, {}) => (
	<div className={`item ${status === 'Done' ? 'done disabled' : ''}`}>
		<label className="labelText">{itemLabel}</label>
		<div className="actions">
			<ul>
				<i className="fa fa-check"
					onClick={() => {
						updateItem(todoId, itemId, { status: 'Done' });
						clearInputBox();
					}
					}
				/>
				<i className="fa fa-pen"
					onClick={() => inputUpdateItemLabel({ itemId, itemLabel, status })}
				/>
				<i className="fa fa-trash"
					onClick={() => {
						window.confirm('Are You Sure?') ? deleteItem(todoId, itemId) : '';
						clearInputBox();
					}}
				/>
			</ul>
		</div>
	</div>
);
export default withUpdateItem(withDeleteItem(ItemContainer));
