import { Resident } from './../residents/resident.model';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { DialogOverviewComponent } from './../design-tools/dialog-overview/dialog-overview.component';
import { Component, OnInit, ViewChild, Input,  OnDestroy, ViewContainerRef, ViewChildren } from '@angular/core';
import { MatMenuTrigger, MatExpansionPanel } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Overlay,  OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ResidentsService } from '../services/residents.service';
import {
  ComponentPortal,
  Portal,
  TemplatePortalDirective
} from '@angular/cdk/portal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  panelExpension: MatExpansionPanel;
  userIsAuthenticated = false;
  hiddenMenuContainer = true;
  buttonMenuOverlay: OverlayRef;
  userId: string;
  residents: Resident[] = [];
  private residentsSub: Subscription;
  private authListenerSubs: Subscription;
  private authStatusSub: Subscription;
  @ViewChild('takeAction') takeAction: TemplatePortalDirective;
  @ViewChild('residentExpansionPanelContent') residentExpansionPanelContent: TemplatePortalDirective;


  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private residentsService: ResidentsService) { }


  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onButtonMenuOverlay() {
   this.buttonMenuOverlay = this.overlay.create();
    this.hiddenMenuContainer = false;
  }

  onCloseButtonMenu() {
    this.buttonMenuOverlay.dispose();
    this.hiddenMenuContainer = true;
  }

  initGetResidents() {
    this.residentsService.getResidents();
    this.userId = this.authService.getUserId();
    this.residentsSub = this.residentsService
      .getResidentUpdateListener()
      .subscribe((residents: Resident[]) => {
        this.residents = residents;

      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

  onViewResident(id: string) {
    this.router.navigate(['/residents', 'view', id]);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }




}
