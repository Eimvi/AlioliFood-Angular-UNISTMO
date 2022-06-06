export interface OrderDto {
  phone:string;
  name:string;
  amount: number;
  shippingCost:number;
  address:string|null;
  payment:string;
  items: ItemsDto[];
}

export interface ItemsDto{
  title:string;
  id:number;
}
