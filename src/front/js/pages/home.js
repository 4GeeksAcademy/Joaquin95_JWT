import React, { useContext } from "react";
import { Context } from "../store/appContext";
import {Link} from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to={"/signup"} className="btn btn-primary">Signup</Link>
			<Link to={"/login"} className="btn btn-primary">Login</Link>
			<Link to={"/profile"} className="btn btn-primary">Profile</Link>
		</div>
	);
};
