import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Pedido, Platillos } from '../interfaces/platillos';
import { Categoria } from '../interfaces/categoria';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly URL =  environment.urlApi;

  pedido: Pedido[] = [];
  numTotal: number[] = [];

  constructor(private http: HttpClient) { }

  getFood() {
    return this.http.get<Platillos>(`${this.URL}food`).pipe(
      map(comida => {
        return comida.body.foods
      })
    )
  }

  actualizarPedido(clave:string, valor:Pedido[]|number[]){
    if(localStorage.getItem(clave) !== null){
      localStorage.setItem(clave, JSON.stringify(valor))
    }else{
      localStorage.removeItem(clave);
      localStorage.setItem(clave, JSON.stringify(valor))
    }
  }

  getCategory() {
    return this.http.get<Categoria>(`${this.URL}category`).pipe(
      map(comida => {
        return comida.body.categories
      })
    )
  }

  guardarPlatillos(orden:Pedido[]){
    this.pedido = orden;
  }

  getTotal(orden: Pedido[]):number[]{
    this.numTotal[0]=0;
    this.numTotal[1]=0;
    for(let i=0; i<orden.length;i++ ){
      this.numTotal[0]+=orden[i].price * orden[i].cantidad;
      this.numTotal[1]+=orden[i].cantidad;
    }
    return this.numTotal;
  }
}
