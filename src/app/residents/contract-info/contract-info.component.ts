import { Subscription } from 'rxjs';
import { FileResident } from './../../app-models/residant-data-models/file-resisent.models';
import { UploadService } from './../../upload/upload.service';
import { ContractInfo } from './../../app-models/residant-data-models/contract-Info.model';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContractResidentService } from './../../services/contract-resident.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  Input,
  AfterContentInit,
  AfterContentChecked,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarConfig, DateAdapter } from '@angular/material';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss']
})
export class ContractInfoComponent implements OnInit {
  contractInfoForm: FormGroup;
  private mode = 'contractInfo/new ||residents/new  ';
  isLoading = false;
  contractInfoId: string;
  contractInfo: ContractInfo;
  filePreview: any;
  fieldNameFront: string;
  residentIdFile: string;
  currentEntryDateValue: Date;
  fileResidents: FileResident[] = [];
  private fileResidentsSub: Subscription;
  @Input() residentId: string;

  constructor(
    private formBuilder: FormBuilder,
    private contractInfosService: ContractResidentService,
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public uploadService: UploadService,
    private snackBar: MatSnackBar,
    private adapter: DateAdapter<any>
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllFileResidents();
  }


  //  Get all residents to be able to select contract residents
  getAllFileResidents() {
    this.uploadService.getAllFileResidents();
    this.fileResidentsSub = this.uploadService
      .getFileResidentUpdateListener()
      .subscribe((fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      });
  }

  // init form add and update contract data
  initForm() {
    this.contractInfoForm = new FormGroup({
      residentId: new FormControl(
        { value: null, disabled: true },
        { validators: [Validators.minLength(3)] }
      ),
      inventoryEntryDate: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      coldWaterIndex: new FormControl(null, {
        validators: [Validators.required]
      }),
      hotWaterIndex: new FormControl(null, {
        validators: [Validators.required]
      }),
      contractSignDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      entryDate: new FormControl(null, { validators: [Validators.required] }),
      contractEndDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      exitDate: new FormControl(null, { validators: [Validators.required] }),
      inventoryExitDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      nextVisitDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      contractRecordedDate: new FormControl(null, {
        validators: [Validators.minLength(3)]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'contractInfo/edit/' || 'residents/view/';
        this.residentId = paramMap.get('id');
        this.isLoading = true;
        this.contractInfosService
          .getContract(this.residentId)
          .subscribe(contractInfoData => {
            this.isLoading = false;
            this.contractInfo = {
              id: contractInfoData.id,
              residentId: this.residentId,
              inventoryEntryDate: contractInfoData.inventoryEntryDate,
              coldWaterIndex: contractInfoData.coldWaterIndex,
              hotWaterIndex: contractInfoData.hotWaterIndex,
              contractSignDate: contractInfoData.contractSignDate,
              contractEndDate: contractInfoData.contractEndDate,
              entryDate: contractInfoData.entryDate,
              exitDate: contractInfoData.exitDate,
              inventoryExitDate: contractInfoData.inventoryExitDate,
              nextVisitDate: contractInfoData.nextVisitDate,
              contractRecordedDate: contractInfoData.contractRecordedDate
            };
            this.contractInfoForm.setValue({
              residentId: this.contractInfo.residentId,
              inventoryEntryDate: this.contractInfo.inventoryEntryDate,
              coldWaterIndex: this.contractInfo.coldWaterIndex,
              hotWaterIndex: this.contractInfo.hotWaterIndex,
              contractSignDate: this.contractInfo.contractSignDate,
              contractEndDate: this.contractInfo.contractEndDate,
              entryDate: this.contractInfo.entryDate,
              exitDate: this.contractInfo.exitDate,
              inventoryExitDate: this.contractInfo.inventoryExitDate,
              nextVisitDate: this.contractInfo.nextVisitDate,
              contractRecordedDate: this.contractInfo.contractRecordedDate
            });
          });
      } else {
        this.mode = 'residents/new || contractInfo/new';
        this.contractInfoId = null;
      }
    });
  }

  // save contractInfo when creating and updating

  onSaveContractInfo() {
    if (this.contractInfoForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'residents/new' || 'contractInfo/new') {
      this.contractInfosService.addNewContract(
        (this.contractInfoForm.value.residentId = this.residentId),
        this.contractInfoForm.value.inventoryEntryDate,
        this.contractInfoForm.value.coldWaterIndex,
        this.contractInfoForm.value.hotWaterIndex,
        this.contractInfoForm.value.contractSignDate,
        this.contractInfoForm.value.entryDate,
        this.contractInfoForm.value.contractEndDate,
        this.contractInfoForm.value.exitDate,
        this.contractInfoForm.value.inventoryExitDate,
        this.contractInfoForm.value.nextVisitDate,
        this.contractInfoForm.value.contractRecordedDate
      );
    } else {
      this.contractInfosService.updateContractInfo(
        this.contractInfoId,
        this.contractInfoForm.value.residentId,
        this.contractInfoForm.value.inventoryEntryDate,
        this.contractInfoForm.value.coldWaterIndex,
        this.contractInfoForm.value.hotWaterIndex,
        this.contractInfoForm.value.contractSignDate,
        this.contractInfoForm.value.entryDate,
        this.contractInfoForm.value.contractEndDate,
        this.contractInfoForm.value.exitDate,
        this.contractInfoForm.value.inventoryExitDate,
        this.contractInfoForm.value.nextVisitDate,
        this.contractInfoForm.value.contractRecordedDate
      );
    }
  }

  saveButtonClick(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = ['green-snackbar'];
    config.horizontalPosition = 'right';
    this.snackBar.open(message, action, config);
  }

  // Defaulting valueS

  onChangeCurrentEntryDateValue(entryDateValue) {
    this.currentEntryDateValue = this.contractInfoForm.value.entryDate;
    const defaultNextVisitDate = new Date(this.currentEntryDateValue);
    const defaultInventoryEntry = new Date(this.currentEntryDateValue);
    const defaultAnnualDate = new Date(this.currentEntryDateValue);

    // NEXT visit date
    defaultNextVisitDate.setMonth(
      this.currentEntryDateValue.getMonth() + 6
    );
    console.log(defaultNextVisitDate + 'default next Visit date');
    if (this.contractInfoForm.value.nextVisitDate === null) {
      this.contractInfoForm.controls.nextVisitDate.setValue(
        defaultNextVisitDate
      );
    } else {
      console.log('the next visit date has already a value');
    }

    // Default annual date
    defaultAnnualDate.setFullYear(
      this.currentEntryDateValue.getUTCFullYear() + 1
    );
    if (this.contractInfoForm.value.contractEndDate === null) {
      this.contractInfoForm.controls.contractEndDate.setValue(
        defaultAnnualDate
      );
    } else {
      console.log('contractEnd has already a value');
    }

    if (this.contractInfoForm.value.exitDate === null) {
      this.contractInfoForm.controls.exitDate.setValue(
        defaultAnnualDate
      );
    } else {
      console.log('Exit Date has already a value');
    }

    if (this.contractInfoForm.value.inventoryExitDate === null) {
      this.contractInfoForm.controls.inventoryExitDate.setValue(
        defaultAnnualDate
      );
    } else {
      console.log('Inventory Exit Date has already a value');
    }


    // default Inventory entry date

    defaultInventoryEntry.setDate (
      this.currentEntryDateValue.getDate()
    );

    if (this.contractInfoForm.value.inventoryEntryDate === null) {
      this.contractInfoForm.controls.inventoryEntryDate.setValue(
        defaultInventoryEntry
      );
    } else {
      console.log('Inventory Exit Date has already a value');
    }
  }

}
