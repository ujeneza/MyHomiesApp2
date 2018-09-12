import { Appartment } from './../../app-models/residant-data-models/appartment-info.model';
import { Subscription } from 'rxjs';
import { AppartmentsService } from './../../services/appartment.service';
import { mimeType } from './mime-type.validator';
import { map } from 'rxjs/operators';
// tslint:disable:max-line-length
import { Resident } from '../resident.model';
import { ResidentsService } from '../../services/residents.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-resident-create',
  templateUrl: './resident-create.component.html',
  styleUrls: ['./resident-create.component.scss']
})
export class ResidentCreateComponent implements OnInit {
  value = 'Clear me';
  residentForm: FormGroup;
  imagePreview: any;
  private appartmentsSub: Subscription;
  appartments: Appartment[] = [];
  appartment:  any;


  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private residentsService: ResidentsService,
    private router: Router,
    private appartmentsService: AppartmentsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initGetAppartments();
  }

  initForm() {
    this.residentForm = new FormGroup({
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      appartmentInfo: new FormControl(null, {
        validators: [Validators.required]
      }),
      isRentPaid: new FormControl(null, { validators: [Validators.required] }),
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      rent: new FormControl(null, { validators: [Validators.required] }),
      contractEndDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      nextVisitDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    /*
    this.formBuilder.group({
      lastName: '',
      firstName: '',
      appartmentInfo: '',
      isRentPaid: '',
      phoneNumber: '',
      rent: '',
      contractEndDate: '',
      nextVisitDate: '',
    }); */
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.residentForm.patchValue({ image: file });
    this.residentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddNewResident() {
    const firstName = this.residentForm.get('firstName').value;
    const lastName = this.residentForm.get('lastName').value;
    const appartmentInfo = this.residentForm.get('appartmentInfo').value;
    const isRentPaid = this.residentForm.get('isRentPaid').value;
    const phoneNumber = this.residentForm.get('phoneNumber').value;
    const rent = this.residentForm.get('rent').value;
    const contractEndDate = this.residentForm.get('contractEndDate').value;
    const nextVisitDate = this.residentForm.get('nextVisitDate').value;
    const image = this.residentForm.get('image').value;
    this.residentsService.addNewResident(
      firstName,
      lastName,
      appartmentInfo,
      isRentPaid,
      phoneNumber,
      rent,
      contractEndDate,
      nextVisitDate,
      image
    );
    this.residentForm.reset();
  }
  // view the list of all appartments
  initGetAppartments() {
    this.appartmentsService.getAppartments();
    this.appartmentsSub = this.appartmentsService
      .getAppartmentUpdateListener()
      .subscribe((appartments: Appartment[]) => {
        this.appartments = appartments;
      });
  }

  // get one appartment
  getOneAppartment(id) {
    return this.appartments.filter(item => {
      return item.id === id;
    })[0];
  }


  updateSelectedAppartment2() {
    this.appartment = this.getOneAppartment(this.residentForm.get('appartmentInfo').valueChanges.subscribe());
    console.log('this.appartment');
  }
  updateSelectedAppartment1() {
    this.appartment = this.residentForm.get('appartmentInfo').valueChanges.subscribe();
    console.log('this.appartment');
  }

 /*  updateSelectedAppartment1() {
  this.residentForm.get('appartmentInfo').valueChanges.subscribe(
      appartmentData => {
        this.appartment = {
              id: appartmentData.id,
              appartmentCodeName: appartmentData.appartmentCodeName,
              appartmentName: appartmentData.appartmentName,
              rent: appartmentData.rent,
              monthlyExpenses: appartmentData.monthlyExpenses,
              eanNumber: appartmentData.eanNumber,
              electricityMeter: appartmentData.electricityMeter,
              hotWaterMeter: appartmentData.hotWaterMeter,
              coldWaterMeter: appartmentData.coldWaterMeter
        };
      });
      this.selectedAppartment = this.appartment;
  }

    getOneAppartment2(id) {
   this.appartments.filter(appartment => appartment.id !== id)
    .map(appartmentData => {
      this.appartment = {
            id: appartmentData.id,
            appartmentCodeName: appartmentData.appartmentCodeName,
            appartmentName: appartmentData.appartmentName,
            rent: appartmentData.rent,
            monthlyExpenses: appartmentData.monthlyExpenses,
            eanNumber: appartmentData.eanNumber,
            electricityMeter: appartmentData.electricityMeter,
            hotWaterMeter: appartmentData.hotWaterMeter,
            coldWaterMeter: appartmentData.coldWaterMeter
      };
    });
  }


  updateSelectedAppartment(event: Event): void {
    const appartment = (event.target as HTMLInputElement).value[0];
    this.residentForm.get('appartmentInfo').valueChanges.subscribe(appartmentData => {
      this.appartment = {
            id: appartmentData.id,
            appartmentCodeName: appartmentData.appartmentCodeName,
            appartmentName: appartmentData.appartmentName,
            rent: appartmentData.rent,
            monthlyExpenses: appartmentData.monthlyExpenses,
            eanNumber: appartmentData.eanNumber,
            electricityMeter: appartmentData.electricityMeter,
            hotWaterMeter: appartmentData.hotWaterMeter,
            coldWaterMeter: appartmentData.coldWaterMeter
      };
    });
  } */

}
