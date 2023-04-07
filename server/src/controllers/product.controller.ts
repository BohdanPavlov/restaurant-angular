import { Category, Product } from '@/models';
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
import { Op } from 'sequelize';
import * as uuid from 'uuid';

@Controller()
@UseInterceptor(function (action: Action, content: any) {
	if (Array.isArray(content)) {
		content = content.map(product => ({
			id: product.id,
			title: product.title,
			description: product.description,
			category: product['category.name'],
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
			category: content['category.name'],
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
		return await Product.findAll({
			raw: true,
			include: [Category],
		});
	}

	@Get('/products/search/:title')
	async searchProducts (
		@Param('title') title: string,
	) {
		return await Product.findAll({
			raw: true,
			where: {
				title: { [Op.like]: `%${title}%` },
			},
			include: [Category],
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

		await Product.create({
			title,
			description,
			category_id,
			ingredients,
			price,
			imageUrl: fileName,
		});

		return await Product.findOne({
			raw: true,
			where: { title },
			include: [
				{
					model: Category,
				}],
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
				if (err) {
					console.error(`Failed to delete image: ${err}`);
				} else {
					console.log('Image has been deleted successfully!');
				}
			});

			const fileName: string = uuid.v4() + '.jpg';
			product.imageUrl = fileName;
			files.newImg.mv(path.join(__dirname, '..', 'public', fileName));
		} else {
			product.imageUrl = product.oldImg;
		}

		await Product.update(product, { where: { id } });

		return await Product.findOne({
			raw: true,
			where: { id },
			include: [
				{
					model: Category,
				}],
		});
	}

	@Get('/products/:category')
	async getProductsByCategory (
		@Param('category') category: string,
	) {
		return await Product.findAll({
			raw: true,
			include: [
				{
					model: Category,
					where: {
						name: category,
					},
				}],
		});
	}
}
