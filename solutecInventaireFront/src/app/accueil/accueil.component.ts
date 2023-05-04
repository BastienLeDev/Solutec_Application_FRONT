import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  listStock: any;

  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'star'];
  dataSource = new MatTableDataSource<ProductReserved>();
  @ViewChild(MatSort) sort: MatSort;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshAlert()
    this.getPC();
    this.getAlim();
    this.getBadgeIntercontrat();
    this.getBadgeStructure();
    this.getBase();
    this.getCableEthernet();
    this.getCableHDMI();
    this.getCasqueMission();
    this.getCasqueStructure();
    this.getClavier();
    this.getCoqueTelephone();
    this.getEcranStructure();
    this.getEcranTeletravail();
    this.getPCINT();
    this.getSouris();
    this.getSupportPC();
    this.getTelephoneMission();
    this.getTelephoneStructure();
    this.getPosteMission();
    this.getPosteStructure();
    this.getReservation();

    this.getListStock();
    console.log(this.listStock);


  }

  getPC() {
    this.http.get('http://localhost:8301/getStockPc', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.PC_intercontrat = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getSouris() {
    this.http.get('http://localhost:8301/getStockSouris', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Souris = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getAlim() {
    this.http.get('http://localhost:8301/getStockAlim', { responseType: 'text' }).subscribe({
      next: (data) => {
        data = data;
        this.Alimentation = data;

      },
      error: (err) => { console.log(err); }
    });
  }

  getBadgeStructure() {
    this.http.get('http://localhost:8301/getStockBadgeStructure', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Badge_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getBadgeIntercontrat() {
    this.http.get('http://localhost:8301/getStockBadgeIntercontrat', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Badge_intercontrat = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getPosteMission() {
    this.http.get('http://localhost:8301/getStockPosteMission', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Poste_mission = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getPosteStructure() {
    this.http.get('http://localhost:8301/getStockPosteStructure', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Poste_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getBase() {
    this.http.get('http://localhost:8301/getStockBase', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Base = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getTelephoneMission() {
    this.http.get('http://localhost:8301/getStockTelephoneMission', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Telephone_mission = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getTelephoneStructure() {
    this.http.get('http://localhost:8301/getStockTelephoneStructure', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Telephone_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCasqueMission() {
    this.http.get('http://localhost:8301/getStockCasqueMission', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Casque_mission = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCasqueStructure() {
    this.http.get('http://localhost:8301/getStockCasqueStructure', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Casque_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getEcranTeletravail() {
    this.http.get('http://localhost:8301/getStockEcranTeletravail', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Ecran_teletravail = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getEcranStructure() {
    this.http.get('http://localhost:8301/getStockEcranStructure', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Ecran_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getPCINT() {
    this.http.get('http://localhost:8301/getStockPCINT', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.PC_INT = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getSupportPC() {
    this.http.get('http://localhost:8301/getStockSupportPC', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Support_PC = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getClavier() {
    this.http.get('http://localhost:8301/getStockClavier', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Clavier = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCableHDMI() {
    this.http.get('http://localhost:8301/getStockCablesHDMI', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Cables_HDMI = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCableEthernet() {
    this.http.get('http://localhost:8301/getStockCablesEthernet', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Cables_ethernet = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCoqueTelephone() {
    this.http.get('http://localhost:8301/getStockCoqueTelephone', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.Coque_telephone = data;
      },
      error: (err) => { console.log(err); }
    });
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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getListStock() {
    this.http.get('http://localhost:8301/products/getStock').subscribe({
      next: (data) => {
        console.log(data);

        this.listStock = data;
        console.log(this.listStock);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
