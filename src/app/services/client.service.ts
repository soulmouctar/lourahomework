import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientModel } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 public clients: ClientModel[];
  clientSubject = new Subject<any[]>();
  constructor(
  ) {
    this.clients = [];
  }

  add(clt: ClientModel): void {
    const c = new ClientModel(
      // this.clients ? this.clients[(this.clients.length - 1)].id + 1 : 1,
      clt.nom, clt.prenom, clt.telephone, clt.email, clt.adresse, clt.debut, clt.fin, clt.marque,
      clt.immatriculation, clt.puissance, clt.encirculation
    );
    this.clients.push(c);
    this.getAll();
    console.log(this.clients);
  }

  getAll(): any {
    this.clientSubject.next(this.clients.slice());
    return this.clients[0];
  }

}
