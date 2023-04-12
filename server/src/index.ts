import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import dotenv from 'dotenv';
import log4js from 'log4js';
import cors from 'cors';
import * as path from 'path';
import fileUpload from 'express-fileupload'

import { prisma } from './database';
import { CategoriesController } from './controllers/categories.controller';
import { NewsController } from './controllers/news.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';

const PORT: string | number = process.env.PORT ?? 8080;
const app: Express = express();
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());
app.use(fileUpload({}));
useExpressServer(app, {
	controllers: [
		UserController,
		ProductController,
		CategoriesController,
		NewsController
	]
});
dotenv.config();

export const logger: log4js.Logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const start = async () => {
	try {
		await prisma.$connect();
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
	finally {
		await prisma.$disconnect();
	}
}

start();
