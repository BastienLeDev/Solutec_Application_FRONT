import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GestionStockComponent } from '../gestion-stock/gestion-stock.component';
import { RedirectionService } from '../_services/redirection.service';

export interface ProductReserved {
  //Propriétées pour le tableau
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;
  daysInStock: number;

}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  PC_intercontrat: any;
  Souris: any;
  Clavier: any;
  Poste_mission: any;
  Poste_structure: any;
  Base: any;
  Telephone_structure: any;
  Telephone_mission: any;
  Cables_HDMI: any;
  Cables_ethernet: any;
  Badge_structure: any;
  Badge_intercontrat: any;
  Coque_telephone: any;
  Support_PC: any;
  PC_INT: any;
  Ecran_teletravail: any;
  Ecran_structure: any;
  Alimentation: any;
  Casque_mission: any;
  Casque_structure: any;
  ProductsReserved: ProductReserved[] = [];
  RemoveReservation: any;
  lengthDataSource: any;
  currentDate = new Date();
  listProductAlert: any;
  listStock: any;

  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'daysInStock', 'star'];
  dataSource = new MatTableDataSource<ProductReserved>();
  @ViewChild(MatSort) sort: MatSort;



  constructor(private http: HttpClient, private route: Router, private redirectService: RedirectionService) { }

  ngOnInit(): void {
    this.ProductsReserved= [];
    this.refreshAlert()
    this.getReservation();
    this.getListStock();
  }


  
  getReservation() {
    this.http.get('http://localhost:8301/getReservation').subscribe({
      next: (data) => {
        console.log(data);
        let list: any;
        list= data;
        for(let i in list){
          console.log(i);
          
          let entryDate = new Date(list[i].entryDate);
          let date=new Date();

          function difference(date1: any, date2 : any) {
            const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
              let day = 1000*60*60*24;
            return(date2utc - date1utc)/day
          }

          let time_difference = difference(entryDate,date);
          let obj = {} as ProductReserved;
          
          obj.idProduct = list[i].idProduct;
          obj.nameProduct= list[i].typeProduct.nameProduct;
          obj.refProduct= list[i].refProduct;
          obj.owner= list[i].owner;
          obj.entryDate= list[i].entryDate;
          obj.daysInStock= time_difference;
        console.log(obj);
        
          this.ProductsReserved.push(obj);
          
        }
       
        
        this.dataSource = new MatTableDataSource<ProductReserved>(this.ProductsReserved);
        this.dataSource.sort = this.sort;
        this.lengthDataSource = this.ProductsReserved.length;
      },
      error: (err) => { console.log(err) },
    })
  }

  removeReservation(val: any) {
    this.http.get('http://localhost:8301/removeReservation/' + val).subscribe({
      next: (data) => {
        this.RemoveReservation = data;
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
    })
  }

  refreshAlert() {
    this.http.patch('http://localhost:8301/refreshAlert', null).subscribe({
      next: (data) => {
        this.listProductAlert = data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  containsString(list: string[], searchString: string): boolean {
    return list.indexOf(searchString) !== -1;
  }

  getListStock() {
    this.http.get('http://localhost:8301/products/getStock').subscribe({
      next: (data) => {
        this.listStock = data;
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goToGestionStockElement(val: any) {
    this.route.navigateByUrl('stock');
    this.redirectService.setNameProductToRedirect(val[0]);
    this.redirectService.setToRedirect();

  }

}
