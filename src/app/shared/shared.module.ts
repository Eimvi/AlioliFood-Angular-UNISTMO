import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuRoutingModule } from '../menu/menu-routing.module';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
