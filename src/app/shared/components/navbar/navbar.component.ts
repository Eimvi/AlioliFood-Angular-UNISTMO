import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  bandera:boolean=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  verMenu(){
    this.router.navigateByUrl('menu')
  }

  verLogin(){
    this.router.navigateByUrl('auth/login')
  }

  verOrden(){
    this.router.navigateByUrl('verPedido')
  }

}
