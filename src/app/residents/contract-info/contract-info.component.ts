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
import { Component, OnInit, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';


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
  fileResidents: FileResident[] = [];
  private fileResidentsSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private contractInfosService: ContractResidentService,
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog ,
    public uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAllFileResidents();
  }


  getAllFileResidents() {
    this.uploadService.getAllFileResidents();
    this.fileResidentsSub = this.uploadService.getFileResidentUpdateListener().subscribe(
      (fileResidents: FileResident[]) => {
        this.fileResidents = fileResidents;
      }
    );
  }

  /*public openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadComponent, { width: '50%', height: '50%' });
  }*/

  initForm() {
    this.contractInfoForm = new FormGroup({
      residentId: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      inventoryEntryDate: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      coldWaterIndex: new FormControl(null, { validators: [Validators.required]}),
      hotWaterIndex: new FormControl(null, { validators: [Validators.required] }),
      contractSignDate: new FormControl(null, { validators: [Validators.required] }),
      entryDate: new FormControl(null, {validators: [Validators.required]}),
      contractEndDate: new FormControl(null, {validators: [Validators.required]}),
      exitDate: new FormControl(null, {validators: [Validators.required]}),
      inventoryExitDate: new FormControl(null, {validators: [Validators.required]}),
      nextVisitDate: new FormControl(null, {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'contractInfo/edit/';
        this.contractInfoId = paramMap.get('id');
        this.isLoading = true;
        this.contractInfosService.getContract(this.contractInfoId).subscribe(contractInfoData => {
          this.isLoading = false;
          this.contractInfo = {
            id: contractInfoData.id,
            residentId: contractInfoData.residentId,
            inventoryEntryDate: contractInfoData.inventoryEntryDate,
            coldWaterIndex: contractInfoData.coldWaterIndex,
            hotWaterIndex: contractInfoData.hotWaterIndex,
            contractSignDate: contractInfoData.contractSignDate,
            contractEndDate: contractInfoData.contractEndDate,
            entryDate: contractInfoData.entryDate,
            exitDate: contractInfoData.exitDate,
            inventoryExitDate: contractInfoData.inventoryExitDate,
            nextVisitDate: contractInfoData.nextVisitDate,
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
    if (this.mode === 'residents/new || contractInfo/new') {
      this.contractInfosService.addNewContract(
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
      );
    }
    this.contractInfoForm.reset();
  }

}
