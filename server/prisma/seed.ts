import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function main () {
	await prisma.category.createMany({
		data: [
			{ name: 'all' },
			{ name: 'pizza' },
			{ name: 'salad' },
			{ name: 'burgers' },
			{ name: 'bakery' },
			{ name: 'drinks' },
		],
	});

	await prisma.news.createMany({
		data: [
			{
				title: 'Додаток для замовлення працює!',
				description: 'Економ свiй час! Роби замовлення у дорозi, в офiсi чи перед перервою, а ми приготуємо його до твого приходу. Додаток для замовлення підключений до всіх закладів мережі піцерій BUFET',
				author: 'Bufet',
				category: 'News',
				imgUrl: 'https://bufet.ua/wp-content/uploads/2022/07/app-bufet-1024x431.jpg',
			},
			{
				title: 'Ми працюємо',
				description: 'Адреси закладів, які вже працюють: 1. Полтавський шлях 126 2. Вул. Любові малої 24 3. Пр-т. Гагаріна 177 4. Вул. Культури 23 5. Пр-т. Архітектора Альошина 19 6. Вул. Сумська 41',
				author: 'Bufet',
				category: 'News',
				imgUrl: 'https://bufet.ua/wp-content/uploads/2022/06/my-vidkruti-1024x431.jpg',
			},
			{
				title: 'Все буде Україна',
				description: 'Ми теж сумували. Ми теж ховалися у сховищах. Ми продовжували готували їжу для ЗСУ, тероборони та цивільних. Дякуємо нашим співробітникам за їхню сміливість з 24 лютого і до цього дня. ',
				author: 'Bufet',
				category: 'News',
				imgUrl: 'https://bufet.ua/wp-content/uploads/2022/06/vse-bude-ukraina-1024x431.jpg',
			},
		],
	});
}

main().then(async () => {
	await prisma.$disconnect();
}).catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1);
});
