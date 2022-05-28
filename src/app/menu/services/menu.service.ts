import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Platillos, Pedido } from '../interfaces/platillos';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly URL =  environment.urlApi;
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


}
