import bcrypt from 'bcrypt';
import {
	Body,
	JsonController,
	Post, Res,
	UseAfter,
	UseBefore,
} from 'routing-controllers';
import 'reflect-metadata';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { User } from '@/models';
import { loggingAfter, loggingBefore } from '@/middleware/middleware';
import ApiError from '@/error/ApiError';
import { AuthResponse, LoginData, RegisterData } from '@/types/user.types';

const generateJwt = (id, email) => {
	return jwt.sign({
			id,
			email,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '24h' });
};

@JsonController()
@UseBefore(loggingBefore)
@UseAfter(loggingAfter)
export class UserController {
	@Post('/login')
	async login (
		@Body() { email, password }: LoginData,
		@Res() res: Response
	): Promise<AuthResponse | ApiError> {
		const user: any = await User.findOne({
			raw: true,
			where: { email }
		});

		if (!user) {
			res.status(404);
			return ApiError.badRequest('There is no user with such email!');
		}

		let comparePassword = bcrypt.compareSync(password, user.password);

		if (!comparePassword) {
			res.status(400);
			return ApiError.badRequest('Invalid email or password!');
		}

		const token = generateJwt(user.id, user.email);

		return {
			user: {
				id: user.id,
				email: user.email,
				username: user.username
			},
			accessToken: token
		};
	}

	@Post('/register')
	async register (
		@Body() { email, username, password }: RegisterData,
		@Res() res: Response
	): Promise<AuthResponse | ApiError> {
		if (!email || !password) {
			res.status(400);
			return ApiError.badRequest('Invalid email or password!');
		}

		const candidate = await User.findOne({
			raw: true,
			where: { email }
		});

		if (candidate) {
			res.status(400);
			return ApiError.badRequest('User with this email already exists!');
		}

		const hashPassword = await bcrypt.hash(password, 5);

		const user: any = await User.create({
			email,
			password: hashPassword,
			username,
		});

		const token = generateJwt(user.id, user.email);

		return {
			user: {
				id: user.id,
				email: user.email,
				username: user.username
			},
			accessToken: token
		};
	}
}
