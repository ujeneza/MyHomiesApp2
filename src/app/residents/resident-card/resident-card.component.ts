import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Resident } from './../resident.model';
import { ResidentsService } from './../../services/residents.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resident-card',
  templateUrl: './resident-card.component.html',
  styleUrls: ['./resident-card.component.scss']
})
export class ResidentCardComponent implements OnInit {
  residents: Resident[] = [];
  private residentsSub: Subscription;
  constructor(private residentsService: ResidentsService,
    public router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.initGetResidents();
  }
  // Init get all residents
  initGetResidents() {
    this.residentsService.getResidents();
    this.residentsSub = this.residentsService
      .getResidentUpdateListener()
      .subscribe((residents: Resident[]) => {
        this.residents = residents;
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
