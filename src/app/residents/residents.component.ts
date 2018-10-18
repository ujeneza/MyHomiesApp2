import { Appartment } from './../app-models/residant-data-models/appartment-info.model';
import { AppartmentsService } from './../services/appartment.service';
import { Resident } from './resident.model';
import { Component, OnInit,  OnDestroy } from '@angular/core';
import { ResidentsService } from '../services/residents.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit, OnDestroy {
  residents: Resident [] = [];
  private residentsSub: Subscription;
  private appartmentsSub: Subscription;
  appartments: Appartment[] = [];
  selectedAppartment: Appartment;

  constructor(private residentsService: ResidentsService,
    public router: Router,
    private appartmentsService: AppartmentsService) { }

  ngOnInit() {
    this.initGetResidents();
    this.initGetAppartments();
  }

  // Init get all residents
  initGetResidents() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService.getResidentUpdateListener()
    .subscribe((residents: Resident[]) => {
      this.residents = residents;
    });
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
  // delete one appartmenet
  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
  }

  onGetColor(isRentPaid: boolean) {
    const residentPaid: Resident = {
      isRentPaid: isRentPaid
    } as Resident;
    if (isRentPaid === true) {
      return 'green';
    } else if ( isRentPaid === false) {
      return 'red';
    }
  }

  onViewResident(id: string) {
    this.router.navigate(['/residents', 'view', id]);
  }


  ngOnDestroy(): void {
    this.residentsSub.unsubscribe();
  }
}
