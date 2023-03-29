import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  Casque_Mission: any;
  Casque_structure: any;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPC();
    this.getAlim();
  }

  getPC() {
    this.http.get('http://localhost:8301/getStockPc').subscribe({
      next: (data) => {
        this.PC_intercontrat = data;
        console.log(this.PC_intercontrat)
      },
      error: (err) => { console.log(err); }
    });
  }

  getSouris() {
    this.http.get('http://localhost:8301/getStockSouris').subscribe({
      next: (data) => {
        this.Souris = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getAlim() {
    this.http.get('http://localhost:8301/getStockAlim').subscribe({
      next: (data) => {
        data = JSON.stringify(data);
        this.Alimentation = data;

      },
      error: (err) => { console.log(err); }
    });
  }

  getBadgeStructure() {
    this.http.get('http://localhost:8301/getStockBadgeStructure').subscribe({
      next: (data) => {
        this.Badge_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getBadgeIntercontrat() {
    this.http.get('http://localhost:8301/getStockBadgeIntercontrat').subscribe({
      next: (data) => {
        this.Badge_intercontrat = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getBadgePosteMission() {
    this.http.get('http://localhost:8301/getStockPosteMission').subscribe({
      next: (data) => {
        this.Poste_mission = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getBadgePosteStructure() {
    this.http.get('http://localhost:8301/getStockPosteStructure').subscribe({
      next: (data) => {
        this.Poste_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getBase() {
    this.http.get('http://localhost:8301/getStockBase').subscribe({
      next: (data) => {
        this.Base = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getTelephoneMission() {
    this.http.get('http://localhost:8301/getStockTelephoneMission').subscribe({
      next: (data) => {
        this.Telephone_mission = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getTelephoneStructure() {
    this.http.get('http://localhost:8301/getStockTelephoneStructure').subscribe({
      next: (data) => {
        this.Telephone_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCasqueMission() {
    this.http.get('http://localhost:8301/getStockCasqueMission').subscribe({
      next: (data) => {
        this.Casque_Mission = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCasqueStructure() {
    this.http.get('http://localhost:8301/getStockCasqueStructure').subscribe({
      next: (data) => {
        this.Casque_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getEcranTeletravail() {
    this.http.get('http://localhost:8301/getStockEcranTeletravail').subscribe({
      next: (data) => {
        this.Ecran_teletravail = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getEcranStructure() {
    this.http.get('http://localhost:8301/getStockEcranStructure').subscribe({
      next: (data) => {
        this.Ecran_structure = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getPCINT() {
    this.http.get('http://localhost:8301/getStockPCINT').subscribe({
      next: (data) => {
        this.PC_INT = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getSupportPC() {
    this.http.get('http://localhost:8301/getStockSupportPC').subscribe({
      next: (data) => {
        this.Support_PC = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getClavier() {
    this.http.get('http://localhost:8301/getStockClavier').subscribe({
      next: (data) => {
        this.Clavier = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCableHDMI() {
    this.http.get('http://localhost:8301/getStockCablesHDMI').subscribe({
      next: (data) => {
        this.Cables_HDMI = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCableEthernet() {
    this.http.get('http://localhost:8301/getStockCablesEthernet').subscribe({
      next: (data) => {
        this.Cables_ethernet = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  getCoqueTelephone() {
    this.http.get('http://localhost:8301/getStockCoqueTelephone').subscribe({
      next: (data) => {
        this.Coque_telephone = data;
      },
      error: (err) => { console.log(err); }
    });
  }

}
