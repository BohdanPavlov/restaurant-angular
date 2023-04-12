import * as fs from 'fs';
import * as path from 'path';
import {
	Action,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseInterceptor,
} from 'routing-controllers';
import * as uuid from 'uuid';

import { prisma } from '../database';

@Controller()
@UseInterceptor(function (action: Action, content: any) {
	if (Array.isArray(content)) {
		content = content.map(product => ({
			id: product.id,
			title: product.title,
			description: product.description,
			category: product.category.name,
			category_id: product.category_id,
			price: product.price,
			oldImg: product.imageUrl,
			ingredients: product.ingredients.split(','),
		}));
	} else {
		content = {
			id: content.id,
			title: content.title,
			description: content.description,
			category: content.category.name,
			category_id: content.category_id,
			price: content.price,
			oldImg: content.imageUrl,
			ingredients: content.ingredients.split(','),
		};
	}

	return content;
})
export class ProductController {
	@Get('/products')
	async getAllProducts () {
		return prisma.products.findMany({
			include: {
				category: true,
			},
		});
	}

	@Get('/products/search/:title')
	async searchProducts (
		@Param('title') title: string,
	) {
		return prisma.products.findMany({
			where: {
				title: { contains: title },
			},
			include: {
				category: true,
			}
		});
	}

	@Post('/products')
	async createNewProduct (
		@Req() req,
	) {
		const { title, description, category_id, ingredients, price } = req.body;
		const { newImg } = req.files;

		const fileName: string = uuid.v4() + '.jpg';
		newImg.mv(path.join(__dirname, '..', 'public', fileName));

		return prisma.products.create({
			data: {
				title,
				description,
				category: {
					connect: {
						id: Number(category_id),
					},
				},
				ingredients,
				price,
				imageUrl: fileName,
			},
			include: {
				category: true
			}
		});
	}

	@Put('/products/:id')
	async editProduct (
		@Param('id') id: string,
		@Req() req,
	) {
		const product = req.body;
		const files = req.files;

		if (files && files.newImg) {
			const filepath: string = path.join(__dirname, '..', 'public',
				product.oldImg);
			fs.unlink(filepath, (err) => {
				err
					? console.error(`Failed to delete image: ${err}`)
					: console.log('Image has been deleted successfully!');
			});

			const fileName: string = uuid.v4() + '.jpg';
			product.imageUrl = fileName;
			files.newImg.mv(path.join(__dirname, '..', 'public', fileName));
		} else {
			product.imageUrl = product.oldImg;
		}

		await prisma.products.update({
			where: { id: Number(id) },
			data: {
				title: product.title,
				description: product.description,
				category: {
					connect: {
						id: Number(product.category_id),
					},
				},
				ingredients: product.ingredients,
				price: product.price,
				imageUrl: product.imageUrl,
			},
		});

		return prisma.products.findFirst({
			where: { id: Number(id) },
			include: {
				category: true
			}
		});
	}

	@Get('/products/:category')
	async getProductsByCategory (
		@Param('category') category: string,
	) {
		return prisma.products.findMany({
			where: {
				category: {
					name: category,
				},
			},
			include: {
				category: true
			}
		});
	}
}
