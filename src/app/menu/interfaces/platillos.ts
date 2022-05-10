export interface Platillos{
  status: number;
  message: string;
  body: Body;
}

interface Body {
  foods: Food[];
}

export interface Food {
  id: number;
  title: string;
  subcategory: string;
  price: number;
  image_url: string;
  popular: boolean;
  category: Category;
}

interface Category {
  id: number;
  name: string;
}

export interface Pedido{
  id: number;
  title: string;
  price: number;
  image_url: string;
  cantidad: number;
}
