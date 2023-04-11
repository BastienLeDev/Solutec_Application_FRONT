import { SelectionModel } from '@angular/cdk/collections';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface TypeProduct{
  idTypeProduct: number | null;
  nameProduct: string;
}


export interface Product {
  //Propriétées pour le tableau
  position: number | null;
  idProduct: number | null;
  typeProduct: TypeProduct;
  refProduct: string;
  owner: string;
  entryDate: Date | null;
  exitDate: Date | null;
  isEdit: boolean;

}
const COLUMNS_SCHEMA = [
  {
    key: "typeProduct",
    type: "TypeProduct",
    label: "Type de produit"
  },
  {
    key: "refProduct",
    type: "text",
    label: "Référence du produit"
  },
  {
    key: "owner",
    type: "text",
    label: "Référent"
  },
  {
    key: "entryDate",
    type: "date",
    label: "Entrée en stock"
  },
  {
    key: "exitDate",
    type: "date",
    label: "Sortie de stock"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  },
  {
    key: "isSelected",
    type: "isSelected",
    label: ""
  },

]


@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})

export class GestionStockComponent implements OnInit {
  listProducts: any;
  listTypeProduct: any;
  listDataSource: Array<any> = [];
  lengthDataSource: any;
  suppr = false;



  /*displayedColumns: string[];*/
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Product>();
  columnsSchema: any = COLUMNS_SCHEMA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delete: Object;

  /*
  selection = new SelectionModel<Product>(true, []);
  */

  /*
  ColumnsToDisplay(){
    if(this.suppr==true){
      this.displayedColumns = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate','modif', 'select'];
    }
    if(this.suppr==false){
      this.displayedColumns = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate','modif'];
    }

  }*/

  isAllSelected() {
    return this.dataSource.data.every((item: any) => item.isSelected);
  }
  isAnySelected() {
    return this.dataSource.data.some((item: any) => item.isSelected);
  }
  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item: any) => ({
      ...item,
      isSelected: event.checked,
    }));
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {

  };

  addRow() {
    const newRow: Product = {
      position: null,
      idProduct: 0,
      typeProduct: {idTypeProduct:null,
                    nameProduct:""
      },
      refProduct: "",
      owner: "",
      entryDate: null,
      isEdit: true,
      exitDate: null,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }


  ngOnInit(): void {
    /*this.ColumnsToDisplay();*/
    this.listProducts = [];
    this.listDataSource = [];
    this.dataSource = new MatTableDataSource;
    /*this.selection.clear();*/
    this.getTypeProduct();
    this.getListProducts();
    


  }



  i: any;

  getListProducts() {
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        this.i = 1;
        for (let index in this.listProducts) {
          let product = {} as any;
          product.position = this.i;
          product.idProduct = this.listProducts[index].idProduct;
          product.typeProduct = this.listProducts[index].typeProduct;
          console.log(this.listProducts[index].typeProduct);
          
          product.refProduct = this.listProducts[index].refProduct;
          product.owner = this.listProducts[index].owner;
          product.entryDate = this.listProducts[index].entryDate;
          product.exitDate = this.listProducts[index].exitDate;
          product.isEdit = false;
          this.listDataSource.push(product);
          this.i += 1;
        }
        this.dataSource = new MatTableDataSource<Product>(this.listDataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.lengthDataSource = this.listProducts.length;
        this.listDataSource = [];
        console.log(this.dataSource);
        

      },
      error: (err) => { console.log(err) },
    })
  };

  modeSuppression() {
    this.suppr = true;
    console.log(this.suppr);
    this.displayedColumns = COLUMNS_SCHEMA.map((col) => col.key);
    this.ngOnInit();
  }

  removeSelectedRows() {
    const products = this.dataSource.data.filter((p: any) => p.isSelected);
    console.log(products)
    if (products.length == 0) {
      this.suppr = false;
    }
    else {
      this.dialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .subscribe((confirm: any) => {
          if (confirm) {
            this.DeleteProduct();
          }
        });
    }

  }

  DeleteProduct() {
    this.suppr = false;
    /*this.ColumnsToDisplay();*/
    console.log(this.suppr)
    const products = this.dataSource.data.filter((p: any) => p.isSelected);
    for (let index in products) {

      this.http.delete('http://localhost:8301/delete/' + products[index].idProduct).subscribe({
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


  addProduct(product: any) {
    console.log(product)
    this.http.post('http://localhost:8301/add/database', product).subscribe({
      next: (data) => {
        product.isEdit=false;
      },
      error: (err) => { console.log(err) },
    })
   
    


  }

  modifProduct(product: any) {
    if (product.idProduct == 0) {
      product.idProduct = null;
      this.addProduct(product);
    }
    else {
      console.log(product)
      console.log(product.typeProduct)
      console.log(product.typeProduct.idTypeProduct);
      
      this.http.patch('http://localhost:8301/patch/product', product).subscribe({
        next: (data) => {
          product.isEdit = false;


        },
        error: (err) => { console.log(err) },
      })
    }
  }

    getTypeProduct(){
      this.http.get('http://localhost:8301/typeProduct/liste').subscribe({
        next: (data) => {
          this.listTypeProduct=data;
          console.log(this.listTypeProduct);
          
        },
        error: (err) => {console.log(err);
        }
      })
    }

    public compareWith(object1: any, object2: any) {
      console.log(object1);
      console.log(object2);
      
      
      return object1 && object2 && object1.nameProduct === object2.nameProduct;
    }

}
