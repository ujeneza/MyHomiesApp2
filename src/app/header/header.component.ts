import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { DialogOverviewComponent } from './../design-tools/dialog-overview/dialog-overview.component';
import { Component, OnInit, ViewChild, Input,  OnDestroy } from '@angular/core';
import { MatMenuTrigger, MatExpansionPanel } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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
  private authListenerSubs: Subscription;


  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router) { }
  name = 'ujeneza';
  animal = 'poppy';

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

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  expandedPanelResident() {
    this.panelExpension.open();
  }


}
