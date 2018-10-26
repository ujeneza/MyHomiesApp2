import { map } from 'rxjs/operators';
import { Appartment } from './../app-models/residant-data-models/appartment-info.model';
import { AppartmentsService } from './../services/appartment.service';
import { Resident } from './resident.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResidentsService } from '../services/residents.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {
  residents: Resident[] = [];
  private residentsSub: Subscription;
  private appartmentsSub: Subscription;
  appartments: Appartment[] = [];
  selectedAppartment: Appartment;
  residentId: string;
  appartmentsId: any[];
  appartmentId: any;
  resident: Resident;
  appartment: Appartment;

  constructor(
    private residentsService: ResidentsService,
    public router: Router,
    private route: ActivatedRoute,
    private appartmentsService: AppartmentsService
  ) {}

  ngOnInit() {

  }

  // Init get all residents
  initGetResidents() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService
      .getResidentUpdateListener()
      .subscribe((residents: Resident[]) => {
        this.residents = residents;
        this.appartmentsId = this.residents.map(residentData => {
          return residentData.appartmentInfo;
        });
        /* this.appartmentsId.forEach(element => {
          this.getAppartmentFromAppartmentId(element);
        }); */

      });
  }

  // get selected appartment
  getAppartmentFromAppartmentId(id) {

    return 'hello';
    // return this.appartmentsService.getAppartment(id)
    // .subscribe(responseData => {
    //   const appartment: Appartment = {
    //   id: responseData.id,
    //   appartmentCodeName: responseData.appartmentCodeName,
    //   appartmentName: responseData.appartmentName
    // } as Appartment;
    //   console.log(appartment.appartmentName + 'appartment');
    //   this.appartmentId = appartment.appartmentName; });

  }

   // get selected appartment
   getAppartmentFromAppartmentId2(id) {

    return this.appartments.filter(item => {
      return item.id === id;
    })[0];
  }

 updateSelectedAppartment(selectedAppartmentId) {
  this.getAppartmentFromAppartmentId(
      selectedAppartmentId
    );
    console.log(this.selectedAppartment + 'selectedAppartment');
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
  // delete one resident
  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
  }

  onGetColor(isRentPaid: boolean) {
    if (true) {
      return 'green';
    } else if (false) {
      return 'red';
    }
  }
  // view current resident
  onViewResident(id: string) {
    this.router.navigate(['/residents', 'view', id]);
  }
}
