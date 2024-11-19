import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
	const  [user, setUser] = useState ({})
	const { store, actions } = useContext(Context);

	const getUser = async () => {
		console.log(store.token)
		let response = await fetch(process.env.BACKEND_URL + "/user" , {
			headers: {
				'Authorization': "Bearer" + store.token,
				'content-type': 'application/json'
			}
		})
		let data = await response.json()
		setUser(data)
	}
	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className="text-center mt-5">
			{
				store.token ?
				<div>
					<h1>Welcome</h1>
					<h3>{user.email}</h3>
				</div>	
				:
				<h1>Need to login</h1>
				}
		</div>
	);
};
