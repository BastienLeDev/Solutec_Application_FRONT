import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  //Propriétées pour le tableau
  position: number;
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;
  exitDate: Date;
  delete: boolean;

}


@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit{
  listProducts: any;
  listDataSource: Array<any> = [];
  lengthDataSource: any;
  suppr = false;



  displayedColumns: string[];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delete: Object;

  selection = new SelectionModel<Product>(true, []);

  ColumnsToDisplay(){
    if(this.suppr==true){
      this.displayedColumns = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate','modif', 'select'];
    }
    if(this.suppr==false){
      this.displayedColumns = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate','modif'];
    }

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
 /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(private http: HttpClient) {

  };


  ngOnInit(): void {
    this.ColumnsToDisplay();
    this.listProducts=[];
    this.listDataSource=[];
    this.dataSource = new MatTableDataSource;
    this.selection.clear();
    this.getListProducts();


  }



  i: any;

  getListProducts() {
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        this.i=1;
        for (let index in this.listProducts) {
          let product = {} as any;
          product.position=this.i;
          product.idProduct = this.listProducts[index].idProduct;
          product.nameProduct = this.listProducts[index].nameProduct;
          product.refProduct = this.listProducts[index].refProduct;
          product.owner = this.listProducts[index].owner;
          product.entryDate = this.listProducts[index].entryDate;
          product.exitDate = this.listProducts[index].exitDate;
          product.delete = false;
          this.listDataSource.push(product);
          this.i+=1;
        }
        this.dataSource = new MatTableDataSource<Product>(this.listDataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.lengthDataSource = this.listProducts.length;
        this.listDataSource=[];
        
      },
      error: (err) => { console.log(err) },
    })
  };

  modeSuppression(){
    this.suppr=true;
    console.log(this.suppr);
    this.ngOnInit();
  }


  DeleteProduct() {
    this.suppr=false;
    this.ColumnsToDisplay();
    console.log(this.suppr)
    for (let index in this.selection.selected) {
      this.http.delete('http://localhost:8301/delete/' + this.selection.selected[index].idProduct).subscribe({
      next: (data) => {
        this.delete = data;
        this.ngOnInit();
        
      },
      error: (err) => { console.log(err) },
    })
     this.ngOnInit();
     console.log(this.suppr)
    }
  };

}
