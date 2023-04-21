import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ProductElement {
  Id: any;
  alerte: string;
  seuil: number;
  active: any;
  triggered: any;
  email: any;
  product: String;
  products: any;
  isEdit: boolean;
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
  listAlert: any;
  dataSource: ProductElement[];
  columnsToDisplay = ['alerte', "seuil", 'active', 'triggered', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'isEdit', 'supprimer'];
  expandedElement: ProductElement | null;
  listDataSource: Array<any> = [];
  delete: any;
  alertCreated: any;
  listTypeProduct: any;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.getAlert();
    this.getTypeProduct();
  }

  addRow() {
    const newRow: ProductElement = {
      Id: 0,
      alerte: "",
      seuil: 0,
      active: "off",
      triggered: "off",
      product: "",
      email: "off",
      isEdit: true,
      products: [],
    };
    this.dataSource = [newRow, ...this.dataSource];
  }

  editMode(val: any) {
    if (val.isEdit == false) {
      val.isEdit = true;
    } else {
      val.isEdit = false;
    }

  }

  //deleteElement(alert: any, element: any) {
  //alert.products.filter((item: any) => element !== item)
  //}


  getAlert() {
    this.http.get('http://localhost:8301/getAlert').subscribe({
      next: (data) => {
        this.listAlert = data;
        this.listAlert.map((element: { idAlert: number; alerte: string; seuil: number; active: boolean; email: boolean; triggered: boolean; products: Object[] }) => {
          let Tree = {} as ProductElement;
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
    alert.triggered = false;
    alert.products.push(alert.product)
    console.log(alert)
    this.http.post('http://localhost:8301/createAlert', alert).subscribe({
      next: (data) => {
        alert.isEdit = false;
        location.reload();
      },
      error: (err) => { console.log(err) }
    })

  }

  modifAlert(alert: ProductElement) {
    if (alert.Id == 0) {
      alert.Id = null;
      this.createAlert(alert)
    }
    else {
      alert.products.push(alert.product)
      if (alert.active == "Off") {
        alert.active = false;
      } else {
        alert.active = true;
      }
      if (alert.email == "Off") {
        alert.email = false;
      } else {
        alert.email = true;
      }
      if (alert.triggered == "Off") {
        alert.triggered = false;
      } else {
        alert.triggered = true;
      }
      this.http.patch('http://localhost:8301/modifyAlert/' + alert.Id, alert).subscribe({
        next: (data) => {
          alert.isEdit = false;
          location.reload();

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


}



