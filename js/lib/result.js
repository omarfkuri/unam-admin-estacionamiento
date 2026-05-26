/**
 * @template T
 * 
 * @param { T } type
 * */
export class Result
{
	_hasError;
	_errorMessage;
	_data;

	/**
	 * @param { boolean } error
	 * @param { T | string } data
	 * */
	constructor(error, data)
	{
		this._hasError = error;

		if (error)
		{
			this._errorMessage = data;
			this._data = null;
		}
		else
		{
			this._errorMessage = null;
			this._data = data;
		}
	}

	/**
	 * @returns { boolean }
	 * */
	get hasError()
	{
		return this._hasError;
	}

	/**
	 * Regresa `null` cuando `hasError == true`
	 * 
	 * @returns { T }
	 * */
	get data()
	{
		return this._data;
	}

	/**
	 * Regresa `null` cuando `hasError == false`
	 * 
	 * @returns { string }
	 * */
	get error()
	{
		return this._errorMessage;
	}
}