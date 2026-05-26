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

	/**
	 * @param { string } userID
	 * 
	 * @returns { Promise<Result<string>> }
	 * */
	async createSession(
		userID
	)
	{
		try
		{
			const { data, error } = await this.db.from('sessions')
			.insert([{
				user_id: userID
			}])
			.select()
			.single();

			if (error)
      	return new Result(true, JSON.stringify(error));

      return new Result(false, data.id);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}

	/**
	 * @param { string } userID
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
	async getUserBySessionToken(
		tokenID
	)
	{
		try
		{
			const { data, error } = await this.db.from('sessions')
			.select("*")
			.eq("id", tokenID)
			.single();

			if (error)
      	return new Result(true, JSON.stringify(error));

			const { data: data2, error: error2 } = await this.db.from('users')
			.select("*")
			.eq("id", data.user_id)
			.single();

			if (error2)
      	return new Result(true, JSON.stringify(error2));

      return new Result(false, data2);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}

	/**
	 * @param { string } tokenID
	 * 
	 * @returns { Promise<Result<null>> }
	 * */
	async removeSession(
		tokenID
	)
	{
		try
		{
			const { error } = await this.db.from('sessions')
			.delete()
			.eq("id", tokenID);

			if (error)
      	return new Result(true, JSON.stringify(error));

      return new Result(false, null);
    }
    catch(error)
    {
      return new Result(true, JSON.stringify(error));
    }
	}
}