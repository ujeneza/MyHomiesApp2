import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { Appartment } from './../app-models/residant-data-models/appartment-info.model';
import { Subscription } from 'rxjs';
import { AppartmentsService } from './../services/appartment.service';
import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-appartment',
  templateUrl: './appartment.component.html',
  styleUrls: ['./appartment.component.scss']
})
export class AppartmentComponent implements OnInit, OnDestroy {
  appartments: Appartment[] = [];
  isLoading = false;
  appartmentId: string;
  private appartmentsSub: Subscription;

  constructor(private appartmentsService: AppartmentsService,
              private router: Router,
              public route: ActivatedRoute) {}

  ngOnInit() {
    this.init();
  }

  // init
  init() {
    this.isLoading = true;
    this.appartmentsService.getAppartments();
    this.appartmentsSub = this.appartmentsService
      .getAppartmentUpdateListener()
      .subscribe((appartments: Appartment[]) => {
        this.isLoading = false;
        this.appartments = appartments;
      }
    );
  }


  onViewResident(id: string) {
    this.router.navigate(['/appartment', 'edit', id]);
  }

  // Delete an appartment
  onDelete(appartmentId: string) {
    this.appartmentsService.deleteAppartment(appartmentId);
  }

  ngOnDestroy(): void {
    this.appartmentsSub.unsubscribe();
  }
}
