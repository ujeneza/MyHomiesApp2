import { mimeType } from './../resident-create/mime-type.validator';
// tslint:disable:quotemark
import { ResidentsService } from "../../services/residents.service";
import { Resident } from "../resident.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
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

  constructor(
    private residentsService: ResidentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getResidentId();
  }

  onGetAllResident() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService
      .getResidentUpdateListener()
      .subscribe((residents: Resident[]) => {
        this.residents = residents;
      });
  }

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

/* getResidentId() {
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
        imagePath: residentData.imagePath.toString()
      }; );
  } */





/*   getResidentId() {
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
        imagePath: residentData.imagePath.toString()
      }; );
  }
 */
  /*   getResidentId() {
    const id = this.route.snapshot.paramMap.get("ResidentId");
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("residentId")) {
        // this.mode = 'resident/view';
        this.residentId = paramMap.get("residentId");

        this.residentsService
          .getResident2(this.residentId)
          .subscribe(residentData => {
            this.resident = {
              id: residentData._id,
              firstName: residentData.firstName,
              lastName: residentData.lastName,
              appartmentInfo: residentData.appartmentInfo,
              isRentPaid: residentData.isRentPaid,
              phoneNumber: residentData.phoneNumber,
              rent: residentData.rent,
              contractEndDate: residentData.contractEndDate,
              nextVisitDate: residentData.nextVisitDate
            };
          });
      } else {
        this.residentId = null;

        console.log("Impossible to find the resident");
      }
    });
  }*/

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

  /* getResidentId() {
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('residentId')) {
        // this.mode = 'resident/view';
        this.residentId = paramMap.get('residentId');
        // this.isLoading = true;
        this.residentsService.getResident(this.residentId)
        .subscribe(residentData => this.resident = residentData
          // this.isLoading = false;

        );
      } else {
        this.residentId = null;
        console.log('Impossible to find the resident');
      }
    });

  } */

  /*  ngOnInit() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService.getResidentUpdateListener()
    .subscribe((residents: Resident[]) => {
      this.residents = residents;
    });
  } */
}
