import { Appartment } from './../../app-models/residant-data-models/appartment-info.model';
import { AppartmentsService } from './../../services/appartment.service';
import { mimeType } from './../resident-create/mime-type.validator';
// tslint:disable:quotemark
import { ResidentsService } from "../../services/residents.service";
import { Resident } from "../resident.model";
import { Component, OnInit, OnDestroy, HostListener, ElementRef } from "@angular/core";
import { Subscription } from "rxjs";
import {
  ActivatedRoute,
  Router,
  ParamMap
} from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  NgForm,
  FormControl, Validators
} from "@angular/forms";

@Component({
  selector: "app-resident-view",
  templateUrl: "./resident-view.component.html",
  styleUrls: ["./resident-view.component.scss"]
})
export class ResidentViewComponent implements OnInit {
  residents: Resident[] = [];
  private residentsSub: Subscription;
 residentId: string;
  resident: Resident;
  residentForm: FormGroup;
  imagePreview: any;
  step = 0;
  private appartmentsSub: Subscription;
  appartments: Appartment[] = [];
  selectedAppartment: Appartment;
  selectedAppartment2: string;
  globalId: string;


  constructor(
    private residentsService: ResidentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appartmentsService: AppartmentsService,
    private element: ElementRef
  ) {
    this.element.nativeElement.object = this.selectedAppartment;
  }



  ngOnInit() {
    this.getResidentId();
    this.initGetAppartments();
    this.idAppartmentInfo();
    this.selectedAppartment = this.getAppartmentFromAppartmentId(this.residentForm.get('appartmentInfo').value);

  }

// get data from appartment Info
 idAppartmentInfo() {
  const id = this.route.snapshot.paramMap.get("id");
  this.residentsService.getResident2(id).subscribe(residentData => {
    const selectedResident: Resident = {
      appartmentInfo: residentData.appartmentInfo,
    } as Resident;
    if (selectedResident.appartmentInfo != null) {
      this.selectedAppartment2 = selectedResident.appartmentInfo;
      this.updateSelectedAppartment(this.selectedAppartment2);
    } else {
      console.log('impossible to find the appartment');
    }

  });
 }


// Get all residents
  onGetAllResident() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService
      .getResidentUpdateListener()
      .subscribe((residents: Resident[]) => {
        this.residents = residents;
      });
  }

  // get a resident onInit function
  getResidentId() {
    this.residentForm = new FormGroup({
      lastName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      firstName: new FormControl( null, {validators: [Validators.required, Validators.minLength(3)]}),
      appartmentInfo: new FormControl( null, {validators: [Validators.required]}),
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, {validators: [Validators.minLength(3)]}),
      dateofBirth: new FormControl(null, {validators: [Validators.minLength(3)]}),
      nationality: new FormControl(null, {validators: [Validators.minLength(3)]}),
      residentOtherInfo: new FormControl(null, {validators: [Validators.minLength(3)]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]})
    });
    const id = this.route.snapshot.paramMap.get("id");
    this.globalId = id;
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
// update the current picture
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
// Save
  onSave() {
     this.residentsService.updateResident(
      this.resident.id,
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

  onGetVisibility(imagePath: string) {
    const resident: Resident = {
      imagePath: imagePath
    } as Resident;
    if (imagePath === '') {
      return 'hidden';
    } else if ( imagePath !== ' ') {
      return 'visible';
    }
  }

  // Steps for each group of information
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  /*   getResidentId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.residentsService.getResident(id)
      .subscribe(resident => this.resident = resident );
  }

  /*
  onSave() {
    const firstName  = this.residentForm.get('firstName').value;
    const lastName  = this.residentForm.get('lastName').value;
    const appartmentInfo  = this.residentForm.get('appartmentInfo').value;
    const isRentPaid = this.residentForm.get('isRentPaid').value;
    const phoneNumber  = this.residentForm.get('phoneNumber').value;
    const rent  = this.residentForm.get('rent').value;
    const contractEndDate  = this.residentForm.get('contractEndDate').value;


    // tslint:disable-next-line:max-line-length

    this.residentsService.updateResident
    (this.residentId, firstName, lastName, appartmentInfo, isRentPaid, phoneNumber, rent, contractEndDate, .subscribe();
    console.log(this.resident.firstName);
  } */

  /*  onSave() {
    const firstName  = this.residentForm.get('firstName').value;
    const lastName  = this.residentForm.get('lastName').value;
    const appartmentInfo  = this.residentForm.get('appartmentInfo').value;
    const isRentPaid = this.residentForm.get('isRentPaid').value;
    const phoneNumber  = this.residentForm.get('phoneNumber').value;
    const rent  = this.residentForm.get('rent').value;
    const contractEndDate  = this.residentForm.get('contractEndDate').value;


    this.residentsService.updateResident
    (this.residentId, firstName, lastName, appartmentInfo, isRentPaid, phoneNumber, rent, contractEndDate, );
  } */

  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
  }

  onViewAllResident() {
    this.router.navigate(["resident"]);
  }
}
