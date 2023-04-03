import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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
  toSupress: [];


  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate', 'select'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delete: Object;

  selection = new SelectionModel<Product>(true, []);

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
    this.listProducts=[];
    this.listDataSource=[];
    this.dataSource = new MatTableDataSource;
    console.log(this.listProducts);
    console.log(this.listDataSource);
    console.log(this.dataSource);
    this.getListProducts();


  }



  i: any;

  getListProducts() {
    console.log(this.listProducts)
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        console.log(data);
        this.listProducts = data;
        console.log(this.listProducts)
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
        console.log(this.dataSource)
        
      },
      error: (err) => { console.log(err) },
    })
  };




  DeleteProduct() {
    console.log(this.selection)
    console.log(this.selection.select)
    
    for (let index in this.selection.selected) {
      console.log(this.selection.selected[index].idProduct)
      this.http.delete('http://localhost:8301/delete/' + this.selection.selected[index].idProduct).subscribe({
      next: (data) => {
        this.delete = data;
        console.log(this.delete)
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
    })
    
    }
    console.log(this.listProducts);
    console.log(this.listDataSource);
    console.log(this.dataSource);
    
    
    
    
    
  };

}
