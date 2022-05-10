import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  logout(){
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
  }
}
