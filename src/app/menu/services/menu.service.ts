import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Platillos } from '../interfaces/platillos';

//import { Categorias } from '../interfaces/categorias';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly URL = 'https://alioli-food-api.herokuapp.com/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getFood() {
    return this.http.get<Platillos>(`${this.URL}food`).pipe(
      map(comida => {
        console.log(comida)
        return comida.body.foods
      })
    )
  }

  getCategory() {
    return this.http.get<Categoria>(`${this.URL}category`).pipe(
      map(comida => {
        console.log(comida)
        return comida.body.categories
      })
    )
  }

}
