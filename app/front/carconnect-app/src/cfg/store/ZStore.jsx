import { create } from "zustand";

export const useStore = create((set) => ({
	user: {
		_id: { "$oid": "" },
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		birtdate: "",
		age: 0,
		city: "",
		postalCode: "",
		gender: "",
		phone: "",
		role: "",
		createdAt: { "$date": "2025-04-03T00:00:00Z" },
		updatedAt: { "$date": "2025-04-03T00:00:00Z" },
		vehicule: null,
		Review: []
	},
	isAuthenticated: false,

	popup: {
		isOpen: false,
		message: "",
		type: "",
	},
	setAuthenticated: (status) => set({ isAuthenticated: status }),

	setData: (data) => set({ data }),
	setUser: (user) => set({ user }),
	errorPop: (message) => {
		set({
			popup: {
				isOpen: true,
				message: message,
				type: "error",
			},
		});
		setTimeout(() => {
			set({
				popup: {
					isOpen: false,
					message: "",
					type: "",
				},
			});
		}, 4200);
	},
	resetUser: () => {
		set({
		  user: {
			_id: { "$oid": "" },
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			birthdate: "",
			age: 0,
			city: "",
			postalCode: "",
			gender: "",
			phone: "",
			role: "",
			createdAt: { "$date": "" },
			updatedAt: { "$date": "" },
			vehicule: null,
			Review: []
		  },
		  isAuthenticated: false
		});
	}
}))