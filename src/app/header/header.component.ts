import { DialogOverviewComponent } from './../design-tools/dialog-overview/dialog-overview.component';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatMenuTrigger, MatExpansionPanel } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  panelOpenState = false;
  panelExpension: MatExpansionPanel;


  constructor(public dialog: MatDialog) { }
  name = 'ujeneza';
  animal = 'poppy';

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: {name: this.name, animal: this.animal},
      width: '50%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  expandedPanelResident() {
    this.panelExpension.open();
  }


}
