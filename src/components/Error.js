const ErrorHandler = ({ loading, error }, {}) => (
	<div>
		{
			loading ? <p>Loading...</p> : error ? <p>Error : (</p> : ''
		}
	</div>
);
export default ErrorHandler;
