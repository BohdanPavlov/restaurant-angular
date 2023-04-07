import { sequelize } from 'database';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: { type: DataTypes.STRING, unique: true },
	username: { type: DataTypes.STRING },
	password: { type: DataTypes.STRING },
});

const Category = sequelize.define('category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Product = sequelize.define('product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: { type: DataTypes.STRING, unique: true, allowNull: false },
	category_id: {
		type: DataTypes.INTEGER, allowNull: false, references: {
			model: Category,
			key: 'id',
		},
	},
	price: { type: DataTypes.STRING, allowNull: false },
	imageUrl: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	ingredients: { type: DataTypes.STRING, allowNull: false },
});

const News = sequelize.define('news', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: { type: DataTypes.STRING, allowNull: false },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	author: { type: DataTypes.STRING, allowNull: false },
	category: { type: DataTypes.STRING, allowNull: false },
	imgUrl: { type: DataTypes.STRING, allowNull: false },
});

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

export {
	User,
	Category,
	Product,
	News
};
