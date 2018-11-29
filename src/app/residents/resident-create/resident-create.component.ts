import { AuthService } from './../../auth/auth.service';
import { Resident } from './../resident.model';
import { Appartment } from './../../app-models/residant-data-models/appartment-info.model';
import { Subscription } from 'rxjs';
import { AppartmentsService } from './../../services/appartment.service';
import { mimeType } from './mime-type.validator';
// tslint:disable:max-line-length
import { ResidentsService } from '../../services/residents.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatTabChangeEvent, MatSnackBarConfig, MatStep, MatHorizontalStepper } from '@angular/material';
import { inlineInterpolate } from '@angular/core/src/view';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-resident-create',
  templateUrl: './resident-create.component.html',
  styleUrls: ['./resident-create.component.scss']
})
export class ResidentCreateComponent implements OnInit {
  value = 'Clear me';
  residentForm: FormGroup;
  imagePreview: any;
  appartmentsSub: Subscription;
  residentsSub: Subscription;
  appartments: Appartment[] = [];
  selectedAppartment: Appartment;
  selectedResident: Resident;
  disabledTab: boolean;
  resident: Resident;
  residents: Resident[] = [];
  globalIdComponent: any;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;



  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private residentsService: ResidentsService,
    private router: Router,
    private appartmentsService: AppartmentsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initGetAppartments();
    this.hiddenUpdateButton();
    this.initGetAllResidents();

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
        validators: [Validators.required, this.validateSelectedAppartment.bind(this)]
      }),
      phoneNumber: new FormControl(null, { validators: [Validators.required,
        Validators.pattern('((\\+32-?))?[0-9]{9}')] }),
      email: new FormControl(null, { validators: [Validators.minLength(3), Validators.email] }),
      dateofBirth: new FormControl(null, {
        validators: [Validators.minLength(3)]
      }),
      nationality: new FormControl(null, {
        validators: [Validators.minLength(3)]
      }),
      residentOtherInfo: new FormControl(null, {
        validators: [Validators.minLength(3)]
      }),

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
          imagePath: responseData.resident.imagePath,
          creator: null
        };
        this.getIDwhileSaving(resident.id);
      });
  }
  // Get id from backend
  getIDwhileSaving(id) {
    return (this.globalIdComponent = id);
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

  // view all the residents
  initGetAllResidents() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService
    .getResidentUpdateListener()
    .subscribe((residents: Resident[]) => {
      this.residents = residents;
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

    // get selected appartment and check if it is already assigned
    getResidentFromAppartmentId(id) {
      return this.residents.filter(item => {
        return item.appartmentInfo === id;
      })[0];
    }


  validateSelectedAppartment(c: FormControl) {
    const apartmenetSelected = this.getResidentFromAppartmentId(c.value);
    if (apartmenetSelected) {
      return {
        errorApartmentSelected: {isValid: false}
      };
    } else {
      return null;
    }

  }
  // Save data while updating
  onSave2() {
    this.residentsService.updateResident(
      this.globalIdComponent,
      this.residentForm.value.firstName,
      this.residentForm.value.lastName,
      this.residentForm.value.appartmentInfo,
      this.residentForm.value.phoneNumber,
      this.residentForm.value.email,
      this.residentForm.value.dateofBirth,
      this.residentForm.value.nationality,
      this.residentForm.value.residentOtherInfo,
      this.residentForm.value.image
    );
  }
// hidden the button save or the button update
  hiddenUpdateButton() {
   if (this.globalIdComponent === undefined) {
     return 'none';
   } else {
     return 'inline';
   }
  }

  hiddenSaveButton() {
    if (this.globalIdComponent === undefined) {
      return 'inline';
    } else {
      return 'none';
    }
  }

  // General controle

  residentDataControl() {
    this.router.navigate(['/residents']);
  }

  // mat snack bar
  saveButtonClick (message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = ['green-snackbar'];
    config.horizontalPosition = 'right';
    this.snackBar.open(message, action, config);
  }

  selectedFlatControl(id) {
    if (id) {
      console.log('the appartment has been already select');
    } else {
      console.log('You can selected the appartment');
    }
  }

}
