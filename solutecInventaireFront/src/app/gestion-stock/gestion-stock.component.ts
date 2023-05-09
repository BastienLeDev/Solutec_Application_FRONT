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
import { RedirectionService } from '../services/redirection.service';

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
  reservation: boolean;
  isEdit: boolean;

}
const COLUMNS_SCHEMA = [
  {
    key: "isInStock",
    type: "isInStock",
    label: "En stock"
  },
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
    key: "reservation",
    type: "isReserved",
    label: "Réservé"
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

  chaineVide = "";

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


  redirect = this.redirectService.getToRedirect();
  filtreToRedirect = this.redirectService.getNameProductToRedirect();


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
  @ViewChild('addTypeProduct') inputName: any;
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

  constructor(private http: HttpClient, public dialog: MatDialog, private _formBuilder: FormBuilder, private redirectService: RedirectionService) {

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
      reservation: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }


  ngOnInit(): void {

    this.listProducts = [];
    this.listDataSource = [];
    this.dataSource = new MatTableDataSource;

    this.getTypeProduct();
    this.getListProducts();
    console.log(this.listProducts);
    
    console.log(this.redirect);
    
    


  }

  

  clearFiltres() {
    this.champsFiltres.reset();
  }

  i: any;

  getListProducts() {
    console.log("list product ok");
    
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        this.listProducts = data;
        console.log(this.listProducts);
        
        this.createDatasource(this.listProducts);
        if(this.redirect == true){
      
          this.fonctionSort(this.filtreToRedirect);
        }
    
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
      product.reservation = anyListProducts[index].reservation;
      product.isEdit = false;
      if (product.owner == null) {
        product.isInStock = true
      }
      else {
        product.isInStock = false;
      }
      this.listDataSource.push(product);
      this.i += 1;
    }
    this.dataSource = new MatTableDataSource<Product>(this.listDataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (row: Product, columnName: string): string => {

      if (columnName == "typeProduct") return row.typeProduct.nameProduct;
      var columnValue = row[columnName as keyof Product] as string;
      return columnValue;

    }
    this.dataSource.paginator = this.paginator;
    this.lengthDataSource = anyListProducts.length;
    this.listDataSource = [];
    console.log(this.listProducts);
    
  }

  modeSuppression() {
    this.suppr = true;
    this.displayedColumns = COLUMNS_SCHEMA.map((col) => col.key);
    this.ngOnInit();
  }

  removeSelectedRows() {
    const products = this.dataSource.data.filter((p: any) => p.isSelected);
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
      if (product.owner == "") {
        product.owner = null;
      }
      if (product.owner == null) {
        product.isInStock = true;
      }
      else {
        product.isInStock = false;
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

    return object1 && object2 && object1.nameProduct === object2.nameProduct;
  }



  fonctionSort(formValue: any) {
    console.log("fonction sort");
    
    this.listProductsSorted = this.listProducts;
    console.log(this.listProducts);
    
    this.listDataSource = [];
    this.dataSource = new MatTableDataSource;
    if(this.redirect == true){
      console.log("sortByRedirect");
      
      this.toSortByRedirectedProduct(formValue, this.listProductsSorted);
      console.log(formValue);
      console.log(this.listProductsSorted);
      
      
          this.listProductsSorted = this.listSortedByTypeProduct;
          console.log(this.listProductsSorted);
          
    }

    if(this.redirect==false){
      for (let i in formValue) {
        if (i == 'isInStock' && formValue[i] != "") {
          this.toSortByStock(formValue[i], this.listProductsSorted);
          this.listProductsSorted = this.listSortedByStock;
        }
        if (i == 'typeProduct' && formValue[i] != "") {
          this.toSortByTypeProduct(formValue[i], this.listProductsSorted);
          this.listProductsSorted = this.listSortedByTypeProduct;
        }
        if (i == 'refProduct' && formValue[i] != "") {
          this.toSortByRefProduct(formValue[i], this.listProductsSorted);
          this.listProductsSorted = this.listSortedByReference;
        }
        if (i == 'owner' && formValue[i] != "") {
          this.toSortByName(formValue[i], this.listProductsSorted);
          this.listProductsSorted = this.listSortedByName;
  
        }
        if (i == 'entryDate' && formValue[i] != "") {
          this.toSortByEntryDate(formValue[i], this.listProductsSorted);
          this.listProductsSorted = this.listSortedByEntryDate;
  
        }
        if (i == 'exitDate' && formValue[i] != "") {
          this.toSortByExitDate(formValue[i], this.listProductsSorted);
          this.listProductsSorted = this.listSortedByExitDate;
  
        }
  
      }

    }
    
    this.createDatasource(this.listProductsSorted);
    console.log(this.listProductsSorted);
    
    this.redirectService.setToRedirectFalse();
    this.redirect=this.redirectService.getToRedirect();
    
    
  }

  toSortByStock(isInStock: any, listToSort: any) {
    this.stockToSort = isInStock;

    if (this.stockToSort == this.inStock) {
      this.listSortedByStock = [];

      listToSort.forEach((element: any) => {
        if (element.owner == null) {
          this.listSortedByStock.push(element);
        }
      });

    }
    if (this.stockToSort == this.notInStock) {
      this.listSortedByStock = [];

      listToSort.forEach((element: any) => {
        if (element.owner != null) {
          this.listSortedByStock.push(element);
        }
      });
    }
  }

  toSortByRedirectedProduct(typeProduct: any, listToSort: any){
    this.listSortedByTypeProduct = [];
    this.typeProductToSort = typeProduct;
    console.log(listToSort);
    

    listToSort.forEach((element: any) => {
      if (element.typeProduct.nameProduct != null && element.typeProduct.nameProduct.includes(this.typeProductToSort)) {
        this.listSortedByTypeProduct.push(element);
      }
    });
    console.log(this.listSortedByTypeProduct);
    
  }

  toSortByTypeProduct(typeProduct: any, listToSort: any) {
    this.listSortedByTypeProduct = [];
    this.typeProductToSort = typeProduct.nameProduct;

    listToSort.forEach((element: any) => {
      if (element.typeProduct.nameProduct != null && element.typeProduct.nameProduct.includes(this.typeProductToSort)) {
        this.listSortedByTypeProduct.push(element);
      }
    });
  }


  toSortByRefProduct(ref: any, listToSort: any) {
    this.listSortedByReference = [];
    this.referenceToSort = ref;

    listToSort.forEach((element: any) => {
      if (element.refProduct != null && element.refProduct.includes(this.referenceToSort)) {
        this.listSortedByReference.push(element);
      }
    });
  }


  toSortByName(name: any, listToSort: any) {
    this.listSortedByName = [];
    this.nameToSort = name;

    listToSort.forEach((element: any) => {
      if (element.owner != null && element.owner.toString().toLowerCase().includes(this.nameToSort.toLowerCase())) {
        this.listSortedByName.push(element);
      }
    });
  }


  toSortByEntryDate(date: any, listToSort: any) {
    this.listSortedByEntryDate = [];
    this.entryDateToSort = date;

    listToSort.forEach((element: any) => {
      if (element.entryDate != null && element.entryDate.includes(this.entryDateToSort)) {
        this.listSortedByEntryDate.push(element);
      }
    });
  }

  toSortByExitDate(date: any, listToSort: any) {
    this.listSortedByExitDate = [];
    this.exitDateToSort = date;

    listToSort.forEach((element: any) => {
      if (element.exitDate != null && element.exitDate.includes(this.exitDateToSort)) {
        this.listSortedByExitDate.push(element);
      }
    });
  }

  newTypeEquipment(val: any){
    console.log(val);
    
    this.http.post('http://localhost:8301/typeProduct/add',val).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  handleClear(){
    // clearing the value
  this.inputName.nativeElement.value = ' ';
  }




}
