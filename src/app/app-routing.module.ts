import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: ClientsComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'clients/:id', component: ClientComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
