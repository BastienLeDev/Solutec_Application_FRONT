import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

export interface AlertElement {
  Id: any;
  alerte: string;
  seuil: number;
  active: any;
  triggered: any;
  email: any;
  product: any;
  products: any;
  isEdit: boolean;
  isEditT: boolean;
  action: string;
}
@Component({
  selector: 'app-gestion-alertes',
  templateUrl: './gestion-alertes.component.html',
  styleUrls: ['./gestion-alertes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    { provide: MatFormFieldControl, useExisting: GestionAlertesComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GestionAlertesComponent,
    }

  ]
})


export class GestionAlertesComponent implements OnInit {
  //Table des alertes
  listAlert: any;
  dataSource: AlertElement[];
  columnsToDisplay = ['alerte', "seuil", 'active', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'isEdit', 'supprimer'];
  expandedElement: AlertElement | null;
  listDataSource: Array<any> = [];
  delete: any;
  alertCreated: any;
  listTypeProduct: any;
  refresh: any;


  //Table des alertes déclenchées
  displayedColumns: string[] = ['Alerte', 'Seuil', 'Date/Heure', 'Actions', 'Modification'];
  dataSourceT = new MatTableDataSource<AlertElement>();
  @ViewChild(MatSort) sort: MatSort;
  listTriggered: any;
  disableSelect: any;
  date = new Date();
  actions = new FormControl('')
  lengthDataSourceT: any;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.refreshAlert2();
    this.getAlert();
    this.getTypeProduct();
    this.getTriggered();

  }

  addRow() {
    const newRow: AlertElement = {
      Id: 0,
      alerte: "",
      seuil: 0,
      active: "Off",
      triggered: "Off",
      product: "",
      email: "Off",
      isEdit: true,
      isEditT: false,
      products: [],
      action: '',
    };
    this.dataSource = [newRow, ...this.dataSource];
  }

  editTMode(row: any) {
    if (row.isEditT === false) {
      row.isEditT = true
    } else {
      row.isEditT = false
    }
  }

  editMode(val: any) {
    if (val.isEdit == false) {
      val.isEdit = true;
    } else {
      val.isEdit = false;
    }
    if (val.active == "Off") {
      val.active = false;
    } else {
      val.active = true;
    }
    if (val.email == "Off") {
      val.email = false;
    } else {
      val.email = true;
    }
    val.product = null;

  }



  getAlert() {
    this.http.get('http://localhost:8301/getAlert').subscribe({
      next: (data) => {
        this.listAlert = data;
        this.listAlert.map((element: { idAlert: number; alerte: string; seuil: number; active: boolean; email: boolean; triggered: boolean; products: Object[] }) => {
          let Tree = {} as AlertElement;
          Tree.Id = element.idAlert;
          Tree.alerte = element.alerte;
          Tree.seuil = element.seuil;
          Tree.isEdit = false;
          Tree.products = element.products;
          if (element.active === true) {
            Tree.active = "On"
          } else {
            Tree.active = "Off"
          }
          if (element.email === true) {
            Tree.email = "On"
          } else {
            Tree.email = "Off"
          }
          if (element.triggered === true) {
            Tree.triggered = "On"
          } else {
            Tree.triggered = "Off"
          }
          this.listDataSource.push(Tree);
        })
        this.dataSource = this.listDataSource;
      },
      error: (err) => { console.log(err); }
    });
  }

  deleteTypeProduct(idAlert: any, nameProduct: any) {
    this.http.patch('http://localhost:8301/deleteTypeProduct/' + nameProduct + "/" + idAlert, null).subscribe({
      next: (data) => {
        this.refreshAlert2();
        location.reload();
      },
      error: (err) => { console.log(err) },
    })
  }

  deleteAlerte(val: any) {
    this.http.delete('http://localhost:8301/deleteAlert/' + val).subscribe({
      next: (data) => {
        this.delete = data;
        location.reload();
      },
      error: (err) => { console.log(err); }

    })
  }

  createAlert(alert: any) {
    if (alert.email === "Off") {
      alert.email = false;
    }
    if (alert.active === "Off") {
      alert.email = false;
    }
    alert.triggered = false;
    if (alert.product != "") {
      alert.product.map((object: any) => { alert.products.push(object) })
    }
    this.http.post('http://localhost:8301/createAlert', alert).subscribe({
      next: (data) => {
        if (alert.active === true) {
          alert.active = "On"
        } else {
          alert.active = "Off"
        }
        if (alert.email === true) {
          alert.email = "On"
        } else {
          alert.email = "Off"
        }
        if (alert.triggered === true) {
          alert.triggered = "On"
        } else {
          alert.triggered = "Off"
        }
        alert.isEdit = false;
        this.refreshAlert()
        location.reload()


      },
      error: (err) => { console.log(err) }
    })

  }

  modifAction(row: any) {
    console.log(row)
    this.http.patch('http://localhost:8301/modifyAlert/' + row.idAlert, row).subscribe({
      next: (data) => {
      },
      error: (err) => { console.log(err) },
    })
  }

  modifAlert(alert: AlertElement) {
    if (alert.Id == 0) {
      alert.Id = null;
      this.createAlert(alert)
    }
    else {
      if (alert.active == false) {
        alert.triggered = "Off"
      }
      if (alert.triggered === "Off") {
        alert.triggered = false
      } else {
        alert.triggered = true
      }
      if (alert.product != null) {
        alert.product.map((object: any) => { alert.products.push(object) })
      }
      this.http.patch('http://localhost:8301/modifyAlert/' + alert.Id, alert).subscribe({
        next: (data) => {
          if (alert.active === true) {
            alert.active = "On"
          } else {
            alert.active = "Off"
          }
          if (alert.email === true) {
            alert.email = "On"
          } else {
            alert.email = "Off"
          }
          if (alert.triggered === true) {
            alert.triggered = "On"
          } else {
            alert.triggered = "Off"
          }
          alert.isEdit = false;
          this.refreshAlert()
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

  refreshAlert() {
    this.http.patch('http://localhost:8301/refreshAlert', null).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  refreshAlert2() {
    this.http.patch('http://localhost:8301/refreshAlert', null).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTriggered() {
    this.http.get('http://localhost:8301/getTrigger').subscribe({
      next: (data) => {
        this.listTriggered = data;
        this.dataSourceT = new MatTableDataSource<AlertElement>(this.listTriggered);
        this.dataSourceT.sort = this.sort;
        this.listTriggered.length = this.lengthDataSourceT;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}



