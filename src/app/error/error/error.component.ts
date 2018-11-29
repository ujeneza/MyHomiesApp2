import { MAT_DIALOG_DATA } from '@angular/material';
import { ErrorService } from './../error.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent  {
  /* data: { message: string };
  private errorSub: Subscription; */

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
) {}
 /*  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorSub = this.errorService.getErrorListener().subscribe(message => {
      this.data = { message: message };
    });
  }

  onHandleError() {
    this.errorService.handleError();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  } */

}
