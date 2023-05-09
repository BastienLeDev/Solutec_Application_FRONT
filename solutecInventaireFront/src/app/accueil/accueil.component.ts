import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GestionStockComponent } from '../gestion-stock/gestion-stock.component';
import { RedirectionService } from '../services/redirection.service';

export interface ProductReserved {
  //Propriétées pour le tableau
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;

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
  ProductsReserved: any;
  RemoveReservation: any;
  lengthDataSource: any;
  currentDate = new Date();
  listProductAlert: any;

  listStock: any;

  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'star'];
  dataSource = new MatTableDataSource<ProductReserved>();
  @ViewChild(MatSort) sort: MatSort;



  constructor(private http: HttpClient, private route: Router, private redirectService: RedirectionService) { }

  ngOnInit(): void {
    this.refreshAlert()
    this.getReservation();
    this.getListStock();



  }


  getReservation() {
    this.http.get('http://localhost:8301/getReservation').subscribe({
      next: (data) => {
        this.ProductsReserved = data;
        this.dataSource = new MatTableDataSource<ProductReserved>(this.ProductsReserved);
        this.dataSource.sort = this.sort;
        this.lengthDataSource = this.ProductsReserved.length;
        console.log(this.dataSource)

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
