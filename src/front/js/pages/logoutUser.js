import React from "react";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
	const navigate = useNavigate();

	const logoutUser = () => {
		sessionStorage.removeItem("token"); // Remove token from sessionStorage
		navigate("/"); // Redirect to the home page
	};

	return (
		<button className="btn btn-secondary" onClick={logoutUser}>
			Log Out
		</button>
	);
};
