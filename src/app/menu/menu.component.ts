import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  pedidoAlmuerzo:Pedido[]=[];
  constructor(private router: Router, private authService:AuthService, private menuService:MenuService) { }

  ngOnInit(): void {}

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  verpedidos(){
    this.menuService.guardarPlatillos(this.pedidoAlmuerzo);
  }

}
