import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Platillos } from '../interfaces/platillos';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly URL =  environment.urlApi;

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



}
