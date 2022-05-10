import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Tel } from '../auth.interface';
import {tap} from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.urlApi;                               //Obtenemos la API desde el enviroment
  constructor(private http: HttpClient) { }


  login(phone: Tel){                                                       //Función Login del servicio recibe un parametro de tipo Tel
    return this.http.post<Login>(`${this.URL}auth/login`,phone).pipe(       //Hacemos la petición
       tap((user)=>{
         localStorage.setItem('token',user.body.user.token);                //Guardamos el token en el localStorage
       })
     );
   }

  logout(){
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
  }
}
