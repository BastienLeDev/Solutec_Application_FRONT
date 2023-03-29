import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
export class GestionStockComponent implements  OnInit{
  listProducts: any;
  lengthDataSource:any;

  
  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate','exitDate'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient){

  };

  
  ngOnInit(): void {
    this.getListProducts();
    
  }
  


  getListProducts(){
    ELEMENT_DATA= [];
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        console.log(data)
        this.listProducts = data;
        this.listProducts.map((p:any)=> ELEMENT_DATA.push({idProduct: p.idProduct, nameProduct: p.nameProduct, refProduct: p.refProduct, owner: p.owner, entryDate: p.entryDate, exitDate: p.exitDate }
        ))
        this.dataSource = new MatTableDataSource<Product>(this.listProducts);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator = this.paginator;
        this.lengthDataSource = this.listProducts.length;
      },
      error: (err) => { console.log(err) },
    })
  };

  
  

  
}
