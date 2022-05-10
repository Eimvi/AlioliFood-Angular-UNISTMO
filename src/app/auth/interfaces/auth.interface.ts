export interface Login {
  status: number;
  message: string;
  body: Body;
}

interface Body {
  user: User;
}

interface User {
  phone: number;
  email: string;
  address: string;
  token: string;
}

export interface Tel{
  phone: number;
}
