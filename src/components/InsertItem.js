/* eslint-disable react/jsx-no-bind */
import withAddItem from './HOC/withAddItem';
import withUpdateItem from './HOC/withUpdateItem';

const InsertItem = ({ todoId, todoItem, isUpdateItem, addTodoItem, intializeInputItemLabel, clearInputBox, updateItem }, {}) => (
	<div className="footer">
		<input type="text" placeholder="Add item..."
			onInput={(e) => intializeInputItemLabel(e)}
			value={todoItem.itemLabel}
			onKeyPress={e => {
				if (e.key === 'Enter' && todoItem.itemLabel) {
					!isUpdateItem ? addTodoItem(todoId, todoItem) :	updateItem(todoId, todoItem.itemId, { itemLabel: todoItem.itemLabel });
					clearInputBox();
				}
			}}
		/>
		<button
			onClick={e => {
				!isUpdateItem ? addTodoItem(todoId, todoItem) :	updateItem(todoId, todoItem.itemId, { itemLabel: todoItem.itemLabel });
				clearInputBox();
			}
			}
			disabled={!todoItem.itemLabel.trim().length}
		>{isUpdateItem ? 'Update' : 'Add'}</button>
	</div>
);
export default withUpdateItem(withAddItem(InsertItem));
