import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Product {
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;
  exitDate: Date;
  inventory: any;
}

const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit {
  listProducts: any;

  constructor(private http: HttpClient){};

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts(){
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        console.log(this.listProducts);
        this.listProducts.map((p:any)=> ELEMENT_DATA.push({idProduct: p.idProduct, nameProduct: p.nameProduct, refProduct: p.refProduct, owner: p.owner, entryDate: p.entryDate, exitDate: p.exitDate, inventory: p.inventory  }
        ))
        console.log(ELEMENT_DATA);
      },
      error: (err) => { console.log(err) },
    })
  };

  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate'];
  dataSource = ELEMENT_DATA;


  
}
