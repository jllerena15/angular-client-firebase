import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  clientDoc: AngularFirestoreDocument<Client>;

  constructor(private db: AngularFirestore) { 
    // this.clients = this.db.collection('clients').valueChanges();
    this.getClients();
  }

  getClients(){
    this.clientsCollection = this.db.collection('clients');
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Client;
          data.id = a.payload.doc.id;
          return data;
        });
      }
    ));
    return this.clients;
  }

  getClient(id){
    this.clientDoc = this.db.doc(`clients/${id}`);
    return this.clientDoc.get();
  }

  deleteClient(client: Client){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }

  addClient(client: Client){
    this.clientsCollection.add(client);
  }

  updateClient(id, client: Client){
    this.clientDoc = this.db.doc(`clients/${id}`);
    this.clientDoc.update(client);
  }
}
