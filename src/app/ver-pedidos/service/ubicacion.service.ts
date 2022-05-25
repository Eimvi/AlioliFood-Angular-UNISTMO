import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RootObject, Result } from '../interfaces/direccion';



@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  error:boolean=false;
  name:string = 'Angular';
  lat!:number;
  lng!:number;
  bandera:boolean=false;
  direccion!:string;

  dir!:Result[];

  constructor(private http: HttpClient) { }

  getLocalizacion(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
          this.getAdrres().subscribe(
            resp=>{
              this.dir=resp;
              console.log(this.dir[0].formatted_address);
              this.direccion=this.dir[0].formatted_address;
              localStorage.setItem('dir',this.direccion);
            }
          );
          this.bandera=false;
        }
      },
        (error: any) => {this.bandera=true}

        );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    return this.bandera;
  }

  getAdrres(){
    return this.http.post<RootObject>('https://alioli-food-api.herokuapp.com/order/get-location',{lat:this.lat,long:this.lng}).pipe(
      map(resp =>{
        return resp.results;
      })
    )
  }

}
