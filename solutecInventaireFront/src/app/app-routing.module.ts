import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GenerationRapportsComponent } from './generation-rapports/generation-rapports.component';
import { GestionAlertesComponent } from './gestion-alertes/gestion-alertes.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'rapports', component: GenerationRapportsComponent },
  { path: 'alertes', component: GestionAlertesComponent },
  { path: 'stock', component: GestionStockComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
