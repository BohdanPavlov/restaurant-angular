export interface IProduct {
  id?: number;
  title: string;
  category: string;
  price: string;
  imageUrl: string;
  info: {
    description: string;
    ingredients: string[];
  };
}
