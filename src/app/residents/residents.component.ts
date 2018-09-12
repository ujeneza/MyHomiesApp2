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

  constructor(private residentsService: ResidentsService, public router: Router) { }

  ngOnInit() {
    this.initGetResidents();
  }

  initGetResidents() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService.getResidentUpdateListener()
    .subscribe((residents: Resident[]) => {
      this.residents = residents;
    });
  }

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
