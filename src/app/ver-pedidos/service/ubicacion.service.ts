import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  error:boolean=false;
  name:string = 'Angular';
  lat!:number;
  lng!:number;
  bandera:boolean=false;

  constructor() { }

  getLocalizacion(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
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
}
