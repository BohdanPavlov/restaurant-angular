export interface IProduct {
  id?: number;
  title: string;
  category_id: number;
  category: string;
  price: string;
  newImg?: File | null;
  oldImg?: File | null;
  description: string;
  ingredients: string[];
}
