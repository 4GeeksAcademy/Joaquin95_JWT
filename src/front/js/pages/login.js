import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const loginUser = async () => {
		const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ 
				email: email,
                password: password
			 })
		});

		if (response.ok) {
			const data = await response.json();
			sessionStorage.setItem("token", data.access_token);
			// actions.setToken(data.access_token); 
			navigate("/profile"); 
			console.log("logged in")
		} else {
			console.log("Login failed");
		}
	};

	return (
		<div className="text-center mt-5">
			<h2>Login</h2>
			<div className="input-group mb-3">
				<span className="input-group-text" id="inputGroup-sizing-default">Email</span>
				<input
					type="text"
					className="form-control"
					onChange={(e) => setEmail(e.target.value)}
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-default"
				/>
			</div>
			<div className="input-group mb-3">
				<span className="input-group-text" id="inputGroup-sizing-default">Password</span>
				<input
					type="password"
					className="form-control"
					onChange={(e) => setPassword(e.target.value)}
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-default"
				/>
			</div>
			<button className="btn btn-primary" onClick={loginUser}>Log In</button>
		</div>
	);
};
