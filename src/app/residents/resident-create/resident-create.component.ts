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
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';

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
  disabledTab: boolean;
  resident: Resident;
  globalIdComponent: any;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private residentsService: ResidentsService,
    private router: Router,
    private appartmentsService: AppartmentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.initGetAppartments();

    this.selectedAppartment = this.getAppartmentFromAppartmentId(
      this.residentForm.get('appartmentInfo').value
    );
  }

  // Disable the other tables on init.
  disabledTabInit() {
    this.disabledTab = false;
    console.log(this.disabledTab + 'Resident Saved');
  }

  // When resident form is valid
  ValidResidentForm() {
    if (this.residentForm.valid === true) {
      console.log('the resident form is valid');
    } else {
      console.log('the formform is not valid');
    }
  }

  // Event when changing the tab
  onChangeTab = (tabChangeEvent: MatTabChangeEvent) => {
    if (tabChangeEvent.index === 0) {
      console.log('index => ', tabChangeEvent.index);
    } else if (this.residentForm.valid) {
      console.log('tabChangeEvent => ', tabChangeEvent);
    }
  }

  // init form

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
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, {validators: [Validators.minLength(3)]}),
      dateofBirth: new FormControl(null, {validators: [Validators.minLength(3)]}),
      nationality: new FormControl(null, {validators: [Validators.minLength(3)]}),
      residentOtherInfo: new FormControl(null, {validators: [Validators.minLength(3)]}),

      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
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
    const phoneNumber = this.residentForm.get('phoneNumber').value;
    const email = this.residentForm.get('email').value;
    const dateofBirth = this.residentForm.get('dateofBirth').value;
    const nationality = this.residentForm.get('nationality').value;
    const residentOtherInfo = this.residentForm.get('residentOtherInfo').value;

    const image = this.residentForm.get('image').value;
    this.residentsService
      .addNewResident(
        firstName,
        lastName,
        appartmentInfo,
        phoneNumber,
        email,
        dateofBirth,
        nationality,
        residentOtherInfo,
        image
      )
      .subscribe(responseData => {
        const resident: Resident = {
          id: responseData.resident.id,
          lastName: lastName,
          firstName: firstName,
          appartmentInfo: appartmentInfo,
          phoneNumber: phoneNumber,
          email: email,
          dateofBirth: dateofBirth,
          nationality: nationality,
          residentOtherInfo: residentOtherInfo,
          imagePath: responseData.resident.imagePath
        };
        this.getIDwhileSaving(resident.id);
      });
     this.residentForm.reset();
  }
  // Get id from backend
getIDwhileSaving(id) {
 return this.globalIdComponent = id;
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
    this.selectedAppartment = this.getAppartmentFromAppartmentId(
      selectedAppartmentId
    );
  }


  // Update an resident
  onUpdateEntryResidentData() {
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
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, {validators: [Validators.minLength(3)]}),
      dateofBirth: new FormControl(null, {validators: [Validators.minLength(3)]}),
      nationality: new FormControl(null, {validators: [Validators.minLength(3)]}),
      residentOtherInfo: new FormControl(null, {validators: [Validators.minLength(3)]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    const id = this.globalIdComponent;
    this.residentsService.getResident2(id).subscribe(residentData => {
      this.resident = {
        id: residentData._id,
        firstName: residentData.firstName,
        lastName: residentData.lastName,
        appartmentInfo: residentData.appartmentInfo,
        phoneNumber: residentData.phoneNumber,
        email: residentData.email,
        dateofBirth: residentData.dateofBirth,
        nationality: residentData.nationality,
        residentOtherInfo: residentData.residentOtherInfo,
        imagePath: residentData.imagePath
      };
      this.residentForm.setValue({
        firstName: this.resident.firstName,
        lastName: this.resident.lastName,
        appartmentInfo: this.resident.appartmentInfo,
        phoneNumber: this.resident.phoneNumber,
        email: this.resident.email,
        dateofBirth: this.resident.dateofBirth,
        nationality: this.resident.nationality,
        residentOtherInfo: this.resident.residentOtherInfo,
        image: this.resident.imagePath
      });
    });
  }
}
