import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = async() => {
        let response = await fetch(process.env.BACKEND_URL + "/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ 
                email: email,
                password: password
            })
        });
        if (response.ok) {
            const data = await response.json();
            alert("Signup successful!"); 
        } else {
            alert("Error creating user"); 
        }
    };

	return (
		<div className="text-center mt-5">
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)}className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
            <button className="btn btn-info" onClick={() => createUser()}>Sign up</button>
		</div>
	);
};
