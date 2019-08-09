import cx from 'classnames/bind';

const Item = ({ itemLabel, status, itemId, intializeInputItemLabel, completeTodoItem, deleteTodoItem }, {}) => (
	<div className={cx('item', status === 'Done' && 'done disabled')}>
		<label className="labelText">{itemLabel}</label>
		<div className="actions">
			<ul>
				<i className="fa fa-check"
					onClick={() => completeTodoItem(itemId)}
				/>
				<i className="fa fa-pen"
					onClick={() => intializeInputItemLabel({ itemId, itemLabel, status })}
				/>
				<i className="fa fa-trash"
					onClick={() => deleteTodoItem(itemId)}
				/>
			</ul>
		</div>
	</div>
);
export default Item;
