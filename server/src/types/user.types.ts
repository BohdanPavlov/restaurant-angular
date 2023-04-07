export interface LoginData {
	email: string,
	password: string
}

export interface RegisterData {
	username: string,
	password: string,
	email: string
}

export interface AuthResponse {
	user: {
		id: number,
		email: string,
		username: string
	},
	accessToken: string
}
