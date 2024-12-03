const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: sessionStorage.getItem("token") || null, 
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				return fetch(process.env.BACKEND_URL + "/api/hello")
					.then((resp) => {
						if (!resp.ok) {
							console.log("Error fetching message from backend");
							return null;
						}
						return resp.json();
					})
					.then((data) => {
						if (data) setStore({ message: data.message });
						return data;
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			},

			changeColor: (index, color) => {
				
				const store = getStore();

				
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				
				setStore({ demo: demo });
			},

			login: (email, password) => {
				return fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				})
					.then((resp) => {
						if (!resp.ok) {
							console.log("Login failed");
							return null;
						}
						return resp.json();
					})
					.then((data) => {
						if (data && data.access_token) {
							sessionStorage.setItem("token", data.access_token);
							setStore({ token: data.access_token });
						}
						return data;
					})
					.catch((error) => {
						console.error("Login error:", error);
					});
			},

			logout: () => {
		
				sessionStorage.removeItem("token");
				setStore({ token: null });
			},
		}
	};
};

export default getState;
