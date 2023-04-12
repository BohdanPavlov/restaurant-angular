import { Get, JsonController } from 'routing-controllers';
import { prisma } from '../database';

@JsonController()
export class NewsController {
	@Get('/news')
	async getAllNews () {
		return prisma.news.findMany();
	}
}
