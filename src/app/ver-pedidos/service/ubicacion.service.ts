import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Result, Ubicacion } from '../interfaces/direccion';
import { environment } from '../../../environments/environment';
import { Coor } from '../interfaces/coordenadas';
import { Subject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private readonly URL = environment.urlApi;
  error:boolean=false;
  name:string = 'Angular';
  Body!:Coor;
  lat!:number;
  lng!:number;
  bandera: Subject<boolean> = new Subject<boolean>();
  direccion:Subject<string> = new Subject<string>();

  dir!:Result[];

  constructor(private http: HttpClient) { }

  getLocalizacion(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.Body={lat:position.coords.latitude,long:position.coords.longitude};
          this.getAdrres().subscribe(
            resp=>{
              this.dir=resp;
              this.direccion.next(this.dir[0].formatted_address);
              localStorage.setItem('dir',this.dir[0].formatted_address);
            }
          );
          this.bandera.next(false);
        }
      },
        (error: any) => {this.bandera.next(true);}

        );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    return this.bandera.asObservable();
  }

  getAdrres(){
    return this.http.post<Ubicacion>(`${this.URL}order/get-location`,this.Body).pipe(
      map(resp =>{
        return resp.results;
      })
    )
  }

  getDireccion(){
    return this.direccion.asObservable();
  }

}
