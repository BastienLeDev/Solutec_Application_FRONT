import { SelectionModel } from '@angular/cdk/collections';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from } from 'rxjs';

export interface TypeProduct {
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
  listProductsSorted: any;
  listTypeProduct: any;
  listDataSource: Array<any> = [];
  lengthDataSource: any;
  suppr = false;

  chaineVide="";

  listSortedByStock = [] as any;
  listSortedByTypeProduct = [] as any;
  listSortedByReference = [] as any;
  listSortedByName = [] as any;
  listSortedByEntryDate = [] as any;
  listSortedByExitDate = [] as any;

  stockToSort: any;
  inStock = "En stock";
  notInStock = "Sorti de stock";

  typeProductToSort: any;
  nameToSort: any;
  referenceToSort: any;
  entryDateToSort: any;
  exitDateToSort: any;

  champsFiltres = this._formBuilder.group({
    isInStock: new FormControl(''),
    typeProduct: new FormControl(''),
    refProduct: new FormControl(''),
    owner: new FormControl(''),
    entryDate: new FormControl(''),
    exitDate: new FormControl('')

  })




  /*displayedColumns: string[];*/
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Product>();
  columnsSchema: any = COLUMNS_SCHEMA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delete: Object;

  

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

  constructor(private http: HttpClient, public dialog: MatDialog, private _formBuilder: FormBuilder) {

  };

  addRow() {
    const newRow: Product = {
      position: null,
      idProduct: 0,
      typeProduct: {
        idTypeProduct: null,
        nameProduct: ""
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
    
    this.listProducts = [];
    this.listDataSource = [];
    this.dataSource = new MatTableDataSource;

    this.getTypeProduct();
    this.getListProducts();



  }



  i: any;

  getListProducts() {
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        this.createDatasource(this.listProducts);
      },
      error: (err) => { console.log(err) },
    })

  }

  createDatasource(anyListProducts: any) {
    this.i = 1;
    for (let index in anyListProducts) {
      let product = {} as any;
      product.position = this.i;
      product.idProduct = anyListProducts[index].idProduct;
      product.typeProduct = anyListProducts[index].typeProduct;
      product.refProduct = anyListProducts[index].refProduct;
      product.owner = anyListProducts[index].owner;
      product.entryDate = anyListProducts[index].entryDate;
      product.exitDate = anyListProducts[index].exitDate;
      product.isEdit = false;
      this.listDataSource.push(product);
      this.i += 1;
    }
    this.dataSource = new MatTableDataSource<Product>(this.listDataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (row:Product,columnName:string) : string => {
    
      console.log(row,columnName);
      if(columnName=="typeProduct") return row.typeProduct.nameProduct;
      var columnValue = row[columnName as keyof Product] as string;
      return columnValue;
    
    }
    this.dataSource.paginator = this.paginator;
    this.lengthDataSource = anyListProducts.length;
    this.listDataSource = [];
  }

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
        product.isEdit = false;
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
      if(product.owner == ""){
        product.owner = null;
      }

      this.http.patch('http://localhost:8301/patch/product', product).subscribe({
        next: (data) => {
          product.isEdit = false;


        },
        error: (err) => { console.log(err) },
      })
    }
  }

  getTypeProduct() {
    this.http.get('http://localhost:8301/typeProduct/liste').subscribe({
      next: (data) => {
        this.listTypeProduct = data;
            },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public compareWith(object1: any, object2: any) {
    console.log(object1);
    console.log(object2);


    return object1 && object2 && object1.nameProduct === object2.nameProduct;
  }

  fonctionSort(formValue: any){
    this.listProductsSorted = [];
    this.listDataSource = [];
    this.dataSource = new MatTableDataSource;
    
    console.log(formValue);
    if(formValue.isInStock == "" && formValue.typeProduct == "" 
      && formValue.refProduct ==""  && formValue.owner == "" 
      && formValue.entryDate == ""  && formValue.exitDate == ""){
        this.getListProducts();
    }

    if(formValue.isInStock != "" ){
      console.log('stock');
      
      this.toSortByStock(formValue.isInStock, this.listProducts);
      this.listProductsSorted = this.listSortedByStock;     
    }
    
    if(formValue.typeProduct !="" ){
      console.log('typeP');
      
      this.toSortByTypeProduct(formValue.typeProduct, this.listProducts);
      this.listProductsSorted = this.listSortedByTypeProduct;
    }

    if(formValue.refProduct !=""){
      console.log('refP');
      
      this.toSortByRefProduct(formValue.refProduct, this.listProducts);
      this.listProductsSorted = this.listSortedByReference;
    }

    if(formValue.owner != ""){
      console.log('owner');
      
      this.toSortByName(formValue.owner, this.listProducts);
      this.listProductsSorted = this.listSortedByName;
    }

    if(formValue.entryDate != ""){
      console.log('entryD');
      
      this.toSortByEntryDate(formValue.entryDate, this.listProducts);
      this.listProductsSorted = this.listSortedByEntryDate;
    }

    if(formValue.exitDate != ""){
      console.log('exitD');
      
      this.toSortByExitDate(formValue.exitDate, this.listProducts);
      this.listProductsSorted = this.listSortedByExitDate;
    }
    
  
    console.log(this.listProductsSorted);
    
    this.createDatasource(this.listProductsSorted);
    console.log(this.dataSource);
    
  
  }


  toSortByStock(isInStock: any, listToSort: any){
    this.stockToSort = isInStock;
    
    if(this.stockToSort==this.inStock){
    this.listSortedByStock = [];

      listToSort.forEach((element: any) => {
        if(element.owner == null){
          this.listSortedByStock.push(element);
        }
      });
      console.log(this.listSortedByStock);
      
    }
    if(this.stockToSort==this.notInStock){
    this.listSortedByStock = [];

      listToSort.forEach((element: any) => {
        if(element.owner != null){
          this.listSortedByStock.push(element);
        }
      });
    }
  }


  toSortByTypeProduct(typeProduct: any, listToSort: any){
    this.listSortedByTypeProduct =[];
    this.typeProductToSort = typeProduct.nameProduct;

    listToSort.forEach((element: any) => {
      if(element.typeProduct.nameProduct !=null && element.typeProduct.nameProduct.includes(this.typeProductToSort)){
        this.listSortedByTypeProduct.push(element);
      }
    });
  }


  toSortByRefProduct(ref: any, listToSort: any){
    this.listSortedByReference = [];
    this.referenceToSort = ref;

    listToSort.forEach((element: any)=> {
      if(element.refProduct != null && element.refProduct.includes(this.referenceToSort)){
        this.listSortedByReference.push(element);
      }
    });
  }
  

  toSortByName(name: any, listToSort: any){
    this.listSortedByName = [];
    this.nameToSort = name;
    
    listToSort.forEach((element: any)=> {
      if(element.owner!=null && element.owner.toString().toLowerCase().includes(this.nameToSort.toLowerCase())){
        this.listSortedByName.push(element);
      }   
    });
  }


  toSortByEntryDate(date: any, listToSort: any){
    this.listSortedByEntryDate = [];
    this.entryDateToSort = date;

    listToSort.forEach((element: any) => {
      if(element.entryDate != null && element.entryDate.includes(this.entryDateToSort)){
        this.listSortedByEntryDate.push(element);
      }
    });
  }

  toSortByExitDate(date: any, listToSort: any){
    this.listSortedByExitDate = [];
    this.exitDateToSort = date;

    listToSort.forEach((element: any) => {
      if(element.exitDate != null && element.exitDate.includes(this.exitDateToSort)){
        this.listSortedByExitDate.push(element);
      }
    });
  }
 



}
