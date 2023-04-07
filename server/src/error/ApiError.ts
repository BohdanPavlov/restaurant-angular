class ApiError extends Error {
	status: number;
	message: string;

	constructor (status, message) {
		super()
		this.status = status
		this.message = message
	}

	static badRequest(message): ApiError {
		return new ApiError(404, message)
	}

	static internal(message): ApiError {
		return new ApiError(500, message)
	}

	static forbidden(message): ApiError {
		return new ApiError(403, message)
	}
}

export default ApiError;
