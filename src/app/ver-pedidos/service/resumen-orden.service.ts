import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderDto } from '../interfaces/orden';


@Injectable({
  providedIn: 'root'
})
export class ResumenOrdenService {
  private readonly URL = environment.urlApi;


  constructor(private http: HttpClient) { }

  postOrden(ordenP:OrderDto){
    return this.http.post<OrderDto>(`${this.URL}order/create`,ordenP);
  }
}
