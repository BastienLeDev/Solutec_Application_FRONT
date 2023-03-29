import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;
  exitDate: Date;
}

var ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit, AfterViewChecked {
  listProducts: any;

  
  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate','exitDate'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA)  ;

  constructor(private http: HttpClient){

  };

  @ViewChild(MatSort) sort: MatSort;
  

  ngOnInit(): void {
    this.getListProducts();
  }

  ngAfterViewChecked(): void {
    this.dataSource.sort = this.sort;
  }

  getListProducts(){
    ELEMENT_DATA= [];
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        console.log(this.listProducts);
        this.listProducts.map((p:any)=> ELEMENT_DATA.push({idProduct: p.idProduct, nameProduct: p.nameProduct, refProduct: p.refProduct, owner: p.owner, entryDate: p.entryDate, exitDate: p.exitDate }
        ))
        console.log(ELEMENT_DATA);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA)  ;
      },
      error: (err) => { console.log(err) },
    })
  };

  
  

  
}
