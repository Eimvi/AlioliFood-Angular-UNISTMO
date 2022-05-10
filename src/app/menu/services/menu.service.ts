import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Platillos } from '../interfaces/platillos';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  pedido: Pedido[] = [];

  constructor(private http: HttpClient) { }

  getFood() {
    return this.http.get<Platillos>(`${this.URL}food`).pipe(
      map(comida => {
        return comida.body.foods
      })
    )
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
}
