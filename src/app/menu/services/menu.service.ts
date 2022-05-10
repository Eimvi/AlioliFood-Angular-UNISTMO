import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  pedido: Pedido[] = [];
  constructor() { }

  guardarPlatillos(orden:Pedido[]){
    this.pedido = orden;
  }
}
