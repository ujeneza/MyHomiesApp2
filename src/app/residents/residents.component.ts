import { ContractInfo } from './../app-models/residant-data-models/contract-Info.model';
import { map } from 'rxjs/operators';
import { Appartment } from './../app-models/residant-data-models/appartment-info.model';
import { AppartmentsService } from './../services/appartment.service';
import { Resident } from './resident.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResidentsService } from '../services/residents.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { ContractResidentService } from '../services/contract-resident.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {
  residents: Resident[] = [];
  private residentsSub: Subscription;
  private appartmentsSub: Subscription;
  private contractInfosSub: Subscription;
  appartments: Appartment[] = [];
  contractInfos: ContractInfo[] = [];
  selectedAppartment: Appartment;
  residentId: string;
  appartmentsId: any[];
  appartmentId: any;
  resident: Resident;
  appartment: Appartment;
  contractInfo: ContractInfo;

  constructor(
    private residentsService: ResidentsService,
    public router: Router,
    private route: ActivatedRoute,
    private appartmentsService: AppartmentsService,
    private contractResidentService: ContractResidentService
  ) {}

  ngOnInit() {
    this.initGetResidents();
    this.initGetAppartments();
    this.initGetContractInfos();

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

  getAppartmentOfResident(resident: Resident): Appartment {
   return this.appartments.filter(item => {
    return resident.appartmentInfo === item.id;
   })[0];
  }

  getContractOfResident(resident: Resident): ContractInfo {
    return this.contractInfos.filter(item => {
     return resident.id === item.residentId;
    })[0];
   }
  // view the list of all appartments
  initGetContractInfos() {
    this.contractResidentService.getContractInfos();
    this.contractInfosSub = this.contractResidentService
    .getContractInfoUpdateListener()
      .subscribe((contractInfos: ContractInfo[]) => {
        this.contractInfos = contractInfos;
      });
  }

   // view the list of all contractInfos

   initGetAppartments()  {
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
