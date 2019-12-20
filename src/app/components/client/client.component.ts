import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  id: string;
  client = {} as Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if(this.id != '-1'){
      this.clientService.getClient(this.id).subscribe(
        client => {
          this.client = client.data()
        }
      );
    }
  }

  saveClient() {
    if(this.id != '-1'){
      this.clientService.updateClient(this.id, this.client);
      this.router.navigate(['clients']);
    }else{
      this.clientService.addClient(this.client);
      this.router.navigate(['clients']);
    }    
  }

}
