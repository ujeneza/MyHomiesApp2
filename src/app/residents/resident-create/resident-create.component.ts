import { Appartment } from './../../app-models/residant-data-models/appartment-info.model';
import { Subscription } from 'rxjs';
import { AppartmentsService } from './../../services/appartment.service';
import { mimeType } from './mime-type.validator';
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
  selectedAppartment: Appartment;


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

    this.selectedAppartment = this.getAppartmentFromAppartmentId(this.residentForm.get('appartmentInfo').value);
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

  // a picture to a resident

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

  // add a new resident

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

  // get selected appartment
  getAppartmentFromAppartmentId(id) {
    return this.appartments.filter(item => {
      return item.id === id;
    })[0];
  }


  updateSelectedAppartment(selectedAppartmentId) {
    this.selectedAppartment = this.getAppartmentFromAppartmentId(selectedAppartmentId);
  }

}
