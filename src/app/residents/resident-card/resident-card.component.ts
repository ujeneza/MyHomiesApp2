import { AuthService } from './../../auth/auth.service';
import { UploadService } from './../../upload/upload.service';
import { ContractInfo } from './../../app-models/residant-data-models/contract-Info.model';
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
  @Input() contractInfo: ContractInfo;
  userId: string;
  private authStatusSub: Subscription;
  private residentsSub: Subscription;

  constructor(
    private residentsService: ResidentsService,
    private contractInfoSerive: ContractResidentService,
    public router: Router,
    private route: ActivatedRoute,
    public uploadService: UploadService,
    private authService: AuthService

  ) {}

  ngOnInit() {}

  // delete one resident with all contracts and files
  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
    this.contractInfoSerive.deleteContract(residentId);
    this.uploadService.deleteFileResidentUsingResidentId(residentId);
  }

  // color when the rent is paid or not
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
