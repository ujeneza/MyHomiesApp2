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
  private residentId: string;
  resident: Resident;
  residentForm: FormGroup;
  imagePreview: any;
  step = 0;
  private appartmentsSub: Subscription;
  appartments: Appartment[] = [];
  selectedAppartment: Appartment;
  selectedAppartment2: string;


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
      isRentPaid: new FormControl(null, { validators: [Validators.required] }),
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      rent: new FormControl(null, { validators: [Validators.required] }),
      contractEndDate: new FormControl(null, { validators: [Validators.required] }),
      nextVisitDate: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]})
    });
    const id = this.route.snapshot.paramMap.get("id");
    this.residentsService.getResident2(id).subscribe(residentData => {
      this.resident = {
        id: residentData._id,
        firstName: residentData.firstName,
        lastName: residentData.lastName,
        appartmentInfo: residentData.appartmentInfo,
        isRentPaid: residentData.isRentPaid,
        phoneNumber: residentData.phoneNumber,
        rent: residentData.rent,
        contractEndDate: residentData.contractEndDate,
        nextVisitDate: residentData.nextVisitDate,
        imagePath: residentData.imagePath
      };
      this.residentForm.setValue({
        firstName: this.resident.firstName,
          lastName: this.resident.lastName,
          appartmentInfo: this.resident.appartmentInfo,
          isRentPaid: this.resident.isRentPaid,
          phoneNumber: this.resident.phoneNumber,
          rent: this.resident.rent,
          contractEndDate: this.resident.contractEndDate,
          nextVisitDate: this.resident.nextVisitDate,
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
      this.residentForm.value.isRentPaid,
      this.residentForm.value.phoneNumber,
      this.residentForm.value.rent,
      this.residentForm.value.contractEndDate,
      this.residentForm.value.nextVisitDate,
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
  } */

  /*
  onSave() {
    const firstName  = this.residentForm.get('firstName').value;
    const lastName  = this.residentForm.get('lastName').value;
    const appartmentInfo  = this.residentForm.get('appartmentInfo').value;
    const isRentPaid = this.residentForm.get('isRentPaid').value;
    const phoneNumber  = this.residentForm.get('phoneNumber').value;
    const rent  = this.residentForm.get('rent').value;
    const contractEndDate  = this.residentForm.get('contractEndDate').value;
    const nextVisitDate  = this.residentForm.get('nextVisitDate').value;

    // tslint:disable-next-line:max-line-length

    this.residentsService.updateResident
    (this.residentId, firstName, lastName, appartmentInfo, isRentPaid, phoneNumber, rent, contractEndDate, nextVisitDate).subscribe();
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
    const nextVisitDate  = this.residentForm.get('nextVisitDate').value;

    this.residentsService.updateResident
    (this.residentId, firstName, lastName, appartmentInfo, isRentPaid, phoneNumber, rent, contractEndDate, nextVisitDate);
  } */

  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
  }

  onViewAllResident() {
    this.router.navigate(["resident"]);
  }
}
