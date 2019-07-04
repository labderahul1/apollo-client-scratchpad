const InsertItem = ({ inputText='', updateInputField, addUpdateBtnAction, disabled, btnLabel='Add' }, {}) => (
	<div className="footer">
		<input type="text" placeholder="Add item..."
			onInput={updateInputField}
			value={inputText}
			onKeyPress={addUpdateBtnAction}
		/>
		<button
			onClick={addUpdateBtnAction}
			disabled={disabled}
		>{btnLabel}</button>
	</div>
);
export default InsertItem;
