import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service';

import { Category } from '../../interfaces/categoria';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  cate:string='todos';

  @Input()
  list:Category[] = [];

  @Output()
  enviartodo: EventEmitter<string> = new EventEmitter<string>();

  constructor(private category:MenuService) { }

  ngOnInit(): void {
  }

  opcionCategoria(id:number){
    switch(id){
      case 0:
          this.cate='todos';
      break;
      case 1:
          this.cate='almuerzos';
      break;
      case 2:
          this.cate='entradas';
      break;
      case 3:
          this.cate='postres';
      break;
    }

    this.enviartodo.emit(this.cate);

  }

}
