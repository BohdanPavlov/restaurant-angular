import { Get, JsonController } from 'routing-controllers';

import { prisma } from '../database';

@JsonController()
export class CategoriesController {
	@Get('/categories')
	async getAllCategories () {
		return prisma.category.findMany();
	}
}
