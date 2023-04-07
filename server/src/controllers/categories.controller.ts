import { Get, JsonController } from 'routing-controllers';
import { Model } from 'sequelize';

import { Category } from '@/models';

@JsonController()
export class CategoriesController {
	@Get('/categories')
	async getAllCategories (): Promise<Model<any, any>[]> {
		return await Category.findAll({raw: true});
	}
}
