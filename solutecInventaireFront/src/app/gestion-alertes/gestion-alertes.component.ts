import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  level: number;
  state: boolean;
  triggered: boolean;
  notifEmail: boolean;
  children?: FoodNode[];
}



@Component({
  selector: 'app-gestion-alertes',
  templateUrl: './gestion-alertes.component.html',
  styleUrls: ['./gestion-alertes.component.css']
})


export class GestionAlertesComponent implements OnInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  listAlert: any;


  constructor(private http: HttpClient) {

  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.getAlert();
    console.log(this.dataSource)
  }

  getAlert() {
    this.http.get('http://localhost:8301/getAlert').subscribe({
      next: (data) => {
        this.listAlert = data;
        this.listAlert.map((element: { nameAlert: string; level: number; state: boolean; notifEmail: boolean; triggered: boolean; productAlert: FoodNode[] | any; }) => {
          let Tree = {} as FoodNode;
          Tree.name = element.nameAlert;
          Tree.level = element.level;
          Tree.state = element.state;
          Tree.notifEmail = element.notifEmail;
          Tree.triggered = element.triggered;
          Tree.children = element.productAlert;
          this.dataSource.data.push(Tree);
          console.log(this.dataSource)
          console.log(this.dataSource.data)

        })
      },
      error: (err) => { console.log(err); }
    });
  }
}


