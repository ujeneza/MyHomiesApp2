import { Appartment } from './../../app-models/residant-data-models/appartment-info.model';
import { ContractResidentService } from './../../services/contract-resident.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Resident } from './../resident.model';
import { ResidentsService } from './../../services/residents.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resident-card',
  templateUrl: './resident-card.component.html',
  styleUrls: ['./resident-card.component.scss']
})
export class ResidentCardComponent implements OnInit {
  @Input() resident: Resident;
  @Input() appartment: Appartment;

  private residentsSub: Subscription;
  constructor(private residentsService: ResidentsService,
    private contractInfoSerive: ContractResidentService,
    public router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
  }


    // delete one resident
    onDelete(residentId: string) {
      this.residentsService.deleteResident(residentId);
      this.contractInfoSerive.deleteContract(residentId);
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
