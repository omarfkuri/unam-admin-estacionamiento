import { Result } from "./result.js";

export class DB
{
	db;

	constructor()
	{
		const { createClient } = supabase;
		this.db = createClient(
			'https://uzjhzccmpnhhgeopftid.supabase.co',
			'sb_publishable_PHDWPX_buZxoAYtZdJOZcg_lVmmEcWV'
		);
	}

	/**
	 * @param { string } firstName
	 * @param { string } lastName
	 * @param { string } workerID
	 * 
	 * @returns { Result<null> }
	 * */
	async createUser(
		firstName,
		lastName,
		workerID
	)
	{
		try
		{
			await this.db.from('users')
			.insert([{
				first_name: firstName,
				last_name: lastName,
				worker_id: workerID,
				role_id: 1
			}]);

      return new Result(false, null);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}

	/**
	 * @param { string } firstName
	 * @param { string } lastName
	 * @param { string } workerID
	 * 
	 * @returns { Result<null> }
	 * */
	async getUserByWorkerID(
		workerID
	)
	{
		try
		{
			await this.db.from('users')
			.select("*")
			.eq("worker_id", workerID)
			.single();

      return new Result(false, null);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}
}