import { Get, JsonController } from 'routing-controllers';
import { Model } from 'sequelize';

import { News } from '@/models';

@JsonController()
export class NewsController {
	@Get('/news')
	async getAllNews (): Promise<Model<any, any>[]> {
		return await News.findAll({ raw: true });
	}
}
