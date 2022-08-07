import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({});
  // tslint:disable-next-line:no-inferrable-types
  public IsDisabled: boolean = true;
  // https://stackoverflow.com/questions/65593568/ngx-daterangepicker-material-disable-n-number-of-days-from-start-date
  constructor(
    private formBuider: FormBuilder,
    private clientsrv: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.formBuider.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      email: [null],
      adresse: [null, [Validators.required]],
      telephone: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],

      debut: [null, [Validators.required]],
      fin: [null, {disabled: true }, [Validators.required]],

      marque: [null, [Validators.required]],
      immatriculation: [null, [Validators.required]],
      puissance: ['moins_50', [Validators.required]],
      encirculation: [null, [Validators.required]],
    });
  }


  setDateFin(): void {
    const fin = moment(this.formGroup.controls.debut.value).add(12, 'months');
    this.formGroup.controls.fin.setValue(fin.format('YYYY-MM-DD'));
    console.log(this.formGroup.value);
  }

  onSubmit(): void{
    console.log(this.formGroup.value);
    if (this.formGroup.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Veuillez remplir correctement les champs marqués en <span class=\'text-danger\'>* </span>',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
    if (this.formGroup.controls.debut.value < moment().format('YYYY-MM-DD')) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Le debut de la période de couverture ne doit pas être inférieur à aujourd\'hui',
        showConfirmButton: false,
        timer: 3500
      });
      return;
    }
    if (this.formGroup.controls.encirculation.value > moment().format('YYYY-MM-DD')) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'La date de mise en circultaion ne doit pas être supérieure à aujourd\'hui',
        showConfirmButton: false,
        timer: 3500
      });
      return;
    }
    let phone: string = this.formGroup.get('telephone')?.value;
    phone  = phone.toString();
    if (phone.length < 9 ||  phone.length > 9) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Le numero de téléphone doit être un numero de 9 chiffres',
        showConfirmButton: false,
        timer: 3500
      });
      return;
    }
    this.clientsrv.add(this.formGroup.value);
    this.router.navigateByUrl('/detail');
  }

}
