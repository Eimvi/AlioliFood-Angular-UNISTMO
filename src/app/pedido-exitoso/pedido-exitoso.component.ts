import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pedido-exitoso',
  templateUrl: './pedido-exitoso.component.html',
  styleUrls: ['./pedido-exitoso.component.scss']
})
export class PedidoExitosoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  inicio(): void{
    this.router.navigateByUrl('auth/login');
  }
}
