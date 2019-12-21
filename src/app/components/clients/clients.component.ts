import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  edadPromedio: number;
  edadDesvEstandar: number;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
        let sumaEdad = 0;
        let sumEdadExp = 0;

        this.clients.forEach(element => { sumaEdad += element.age;});
        this.edadPromedio = sumaEdad / this.clients.length;

        this.clients.forEach(element => { sumEdadExp += Math.pow((element.age - this.edadPromedio), 2); });
        this.edadDesvEstandar = Math.round(Math.sqrt(sumEdadExp / this.clients.length) * 100) / 100;
      }
    );
  }

  deleteClient(event, client){
    this.clientService.deleteClient(client);
  }

  addClient(){
    this.router.navigate(['clients', -1]);
  }

  updateClient(event, client){
    this.router.navigate(['clients', client.id]);
  }

}
