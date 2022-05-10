export interface Categoria {
//}
//interface RootObject {
  status: number;
  message: string;
  body: Body;
}

interface Body {
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}
