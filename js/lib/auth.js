import { DB } from "./db.js";
import { Result } from "./result.js";

export class Auth
{
	db;
	tokenName = "tokenID";


	/**
	 * @type { {
	 * 		first_name: string
	 * 		last_name: string
	 * 		worker_id: string
	 * 		password: string
	 * 		role_id: number
	 * 		id: number
	 * } | null }
	 * */
	currentUser = null;

	/**
	 * @param { DB } db
	 * */
	constructor(db)
	{
		this.db = db;
	}

	/**
	 * @returns { Promise<Result<null>> }
	 * */
	async load()
	{
		this.currentUser = null;

		if (this.isLoggedIn())
		{
			const tokenID = localStorage.getItem(this.tokenName);
				
			try 
			{
				const result = await this.db.getUserBySessionToken(tokenID);

				if (result.hasError)
					return result;

				this.currentUser = result.data;
			}
			catch(error)
			{
				return new Result(true, JSON.stringify(error));
			}
		}
		
		return new Result(false, null);
	}

	/**
	 * @returns { boolean }
	 * */
	isLoggedIn()
	{
		return localStorage.getItem(this.tokenName) != null;
	}



	/**
	 * @param { string } userID
	 * 
	 * @returns { Promise<Result<null>> }
	 * */
	async login(userID)
	{
		try 
		{
			const result = await this.db.createSession(userID);

			if (result.hasError)
				return result;

			localStorage.setItem(this.tokenName, result.data);
			return new Result(false, null);
		}
		catch(error)
		{
			return new Result(true, JSON.stringify(error));
		}
	}

	/**
	 * @param { string } token
	 * 
	 * @returns { Promise<Result<null>> }
	 * */
	async logout()
	{
		try 
		{
			const token = localStorage.getItem(this.tokenName);
			console.log(token)

			const result = await this.db.removeSession(token);

			if (result.hasError)
				return result;

			localStorage.removeItem(this.tokenName);
			return new Result(false, null);
		}
		catch(error)
		{
			return new Result(true, JSON.stringify(error));
		}
	}
}