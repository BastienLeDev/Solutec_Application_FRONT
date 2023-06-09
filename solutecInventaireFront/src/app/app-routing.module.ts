import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HistoriqueComponent } from './historique/historique.component';
import { GestionAlertesComponent } from './gestion-alertes/gestion-alertes.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'alertes', component: GestionAlertesComponent },
  { path: 'stock', component: GestionStockComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
