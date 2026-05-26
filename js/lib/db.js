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
	 * @param { string } password
	 * 
	 * @returns { Promise<Result<null>> }
	 * */
	async createUser(
		firstName,
		lastName,
		workerID,
		password
	)
	{
		try
		{
			const { error } = await this.db.from('users')
			.insert([{
				first_name: firstName,
				last_name: lastName,
				worker_id: workerID,
				password,
				role_id: 1
			}]);

			if (error)
      	return new Result(true, JSON.stringify(error));


      return new Result(false, null);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}

	/**
	 * @param { string } workerID
	 * @param { string } password
	 * 
	 * @returns { Promise<Result<{
	 * 		first_name: string
	 * 		last_name: string
	 * 		worker_id: string
	 * 		password: string
	 * 		role_id: number
	 * 		id: number
	 * }>> }
	 * */
	async getUserByWorkerIDAndPassword(
		workerID,
		password
	)
	{
		try
		{
			const { data, error } = await this.db.from('users')
			.select("*")
			.eq("worker_id", workerID)
			.eq("password", password)
			.single();

			if (error)
      	return new Result(true, JSON.stringify(error));

      return new Result(false, data);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}
}