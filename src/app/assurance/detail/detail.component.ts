import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/model/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public client!: ClientModel;
  constructor(
    private cltsrv: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSubscription();
    if (! this.client) {
      this.router.navigateByUrl('/add');
    }
  }

  getSubscription(): any {
    this.client = this.cltsrv.getAll();
    console.log(this.client);
  }

  setPuissance(p: string): any {
    if (p === 'moins_50') {
      return 'Moins de 50';
    }
    if (p === '50_100') {
      return '50 à 1000';
    }
    if (p === '101_200') {
      return '101 à 200';
    }
    if (p === 'plus_200') {
      return 'Plus 200';
    }
  }

}
