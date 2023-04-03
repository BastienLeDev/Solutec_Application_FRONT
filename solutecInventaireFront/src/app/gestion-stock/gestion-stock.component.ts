import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  //Propriétées pour le tableau
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;
  exitDate: Date;
  delete: boolean;

}

export interface Task {
  //Propriétes pour les checkboxs
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit {
  listProducts: any;
  listDataSource: Array<any> = [];
  lengthDataSource: any;
  toSupress: [];


  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate', 'star'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delete: Object;

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
    ],
  };


  constructor(private http: HttpClient) {

  };


  ngOnInit(): void {
    this.getListProducts();


  }


  getListProducts() {
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        for (let index in this.listProducts) {
          let product = {} as any;
          product.idProduct = this.listProducts[index].idProduct;
          product.nameProduct = this.listProducts[index].nameProduct;
          product.refProduct = this.listProducts[index].refProduct;
          product.owner = this.listProducts[index].owner;
          product.entryDate = this.listProducts[index].entryDate;
          product.exitDate = this.listProducts[index].exitDate;
          product.delete = false;
          this.listDataSource.push(product);
        }
        this.dataSource = new MatTableDataSource<Product>(this.listDataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.lengthDataSource = this.listProducts.length;

      },
      error: (err) => { console.log(err) },
    })
  };


  DeleteProduct(val: any) {

    this.http.delete('http://localhost:8301/delete/' + val).subscribe({
      next: (data) => {
        this.delete = data;
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
    })
  };

}
