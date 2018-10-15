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
  private mode = 'resident/new';
  isLoading = false;
  contractInfoId: string;
  contractInfo: ContractInfo;
  filePreview: any;
  fieldNameFront: string;
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
      reresidentId: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      inventoryEntryDate: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      coldWaterIndex: new FormControl(null, { validators: [Validators.required]}),
      hotWaterIndex: new FormControl(null, { validators: [Validators.required] }),
      contractSignDate: new FormControl(null, { validators: [Validators.required] }),
      entryDate: new FormControl(null, {validators: [Validators.required]}),
      contractEndDate: new FormControl(null, {validators: [Validators.required]}),
      exitDate: new FormControl(null, {validators: [Validators.required]}),
      inventoryExitDate: new FormControl(null, {validators: [Validators.required]}),
      nextVisitDate: new FormControl(null, {validators: [Validators.required]}),
      contract: new FormControl(null, {validators: [Validators.required]}),
      inventoryExit: new FormControl(null, {validators: [Validators.required]}),
      inventoryEntry: new FormControl(null, {validators: [Validators.required]}),
      exitCalculation: new FormControl(null, {validators: [Validators.required]}),
      formalNoticeLetter: new FormControl(null, {validators: [Validators.required]}),
      picturesEntryInventory: new FormControl(null, {validators: [Validators.required]}),
      picturesExitInventory: new FormControl(null, {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'resident/contract/edit';
        this.contractInfoId = paramMap.get('id');
        this.isLoading = true;
        this.contractInfosService.getContract(this.contractInfoId).subscribe(contractInfoData => {
          this.isLoading = false;
          this.contractInfo = {
            id: contractInfoData.id,
            reresidentId: contractInfoData.reresidentId,
            inventoryEntryDate: contractInfoData.inventoryEntryDate,
            coldWaterIndex: contractInfoData.coldWaterIndex,
            hotWaterIndex: contractInfoData.hotWaterIndex,
            contractSignDate: contractInfoData.contractSignDate,
            contractEndDate: contractInfoData.contractEndDate,
            entryDate: contractInfoData.entryDate,
            exitDate: contractInfoData.exitDate,
            inventoryExitDate: contractInfoData.inventoryExitDate,
            nextVisitDate: contractInfoData.nextVisitDate,
            contract: contractInfoData.contract,
            inventoryExit: contractInfoData.inventoryExit,
            inventoryEntry: contractInfoData.inventoryEntry,
            exitCalculation: contractInfoData.exitCalculation,
            formalNoticeLetter: contractInfoData.formalNoticeLetter,
            picturesExitInventory: contractInfoData.picturesExitInventory,
            picturesEntryInventory: contractInfoData.picturesEntryInventory,
          };
          this.contractInfoForm.setValue({
            reresidentId: this.contractInfo.reresidentId,
            inventoryEntryDate: this.contractInfo.inventoryEntryDate,
            coldWaterIndex: this.contractInfo.coldWaterIndex,
            hotWaterIndex: this.contractInfo.hotWaterIndex,
            contractSignDate: this.contractInfo.contractSignDate,
            contractEndDate: this.contractInfo.contractEndDate,
            entryDate: this.contractInfo.entryDate,
            exitDate: this.contractInfo.exitDate,
            inventoryExitDate: this.contractInfo.inventoryExitDate,
            nextVisitDate: this.contractInfo.nextVisitDate,
            contract: this.contractInfo.contract,
            inventoryExit: this.contractInfo.inventoryExit,
            inventoryEntry: this.contractInfo.inventoryEntry,
            exitCalculation: this.contractInfo.exitCalculation,
            formalNoticeLetter: this.contractInfo.formalNoticeLetter,
            picturesExitInventory: this.contractInfo.picturesExitInventory,
            picturesEntryInventory: this.contractInfo.picturesEntryInventory,
          });
        });
      } else {
        this.mode = 'resident/new';
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
    if (this.mode === 'resident/new') {
      this.contractInfosService.addNewContract(
        this.contractInfoForm.value.reresidentId,
        this.contractInfoForm.value.inventoryEntryDate,
        this.contractInfoForm.value.coldWaterIndex,
        this.contractInfoForm.value.hotWaterIndex,
        this.contractInfoForm.value.contractSignDate,
        this.contractInfoForm.value.entryDate,
        this.contractInfoForm.value.contractEndDate,
        this.contractInfoForm.value.exitDate,
        this.contractInfoForm.value.inventoryExitDate,
        this.contractInfoForm.value.nextVisitDate,
        this.contractInfoForm.value.contract,
        this.contractInfoForm.value.inventoryExit,
        this.contractInfoForm.value.inventoryEntry,
        this.contractInfoForm.value.exitCalculation,
        this.contractInfoForm.value.formalNoticeLetter,
        this.contractInfoForm.value.picturesEntryInventory,
        this.contractInfoForm.value.picturesExitInventory

      );
    } else {
      this.contractInfosService.updateContractInfo(
        this.contractInfoId,
        this.contractInfoForm.value.reresidentId,
        this.contractInfoForm.value.inventoryEntryDate,
        this.contractInfoForm.value.coldWaterIndex,
        this.contractInfoForm.value.hotWaterIndex,
        this.contractInfoForm.value.contractSignDate,
        this.contractInfoForm.value.entryDate,
        this.contractInfoForm.value.contractEndDate,
        this.contractInfoForm.value.exitDate,
        this.contractInfoForm.value.inventoryExitDate,
        this.contractInfoForm.value.nextVisitDate,
        this.contractInfoForm.value.contract,
        this.contractInfoForm.value.inventoryExit,
        this.contractInfoForm.value.inventoryEntry,
        this.contractInfoForm.value.exitCalculation,
        this.contractInfoForm.value.formalNoticeLetter,
        this.contractInfoForm.value.picturesEntryInventory,
        this.contractInfoForm.value.picturesExitInventory
      );
    }
    this.contractInfoForm.reset();
  }

  // preview the files

  onPicturesExitInventoryPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.contractInfoForm.patchValue({
      picturesExitInventory: file});
    this.contractInfoForm.get('picturesExitInventory').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.contractInfoForm.patchValue({
      contract: file,
      inventoryExit: file,
      inventoryEntry: file,
      exitCalculation: file,
      formalNoticeLetter: file,
      picturesEntryInventory: file,
      picturesExitInventory: file,
       });
    this.contractInfoForm.get('contract').updateValueAndValidity();
    this.contractInfoForm.get('inventoryExit').updateValueAndValidity();
    this.contractInfoForm.get('inventoryEntry').updateValueAndValidity();
    this.contractInfoForm.get('exitCalculation').updateValueAndValidity();
    this.contractInfoForm.get('formalNoticeLette').updateValueAndValidity();
    this.contractInfoForm.get('picturesEntryInventory').updateValueAndValidity();
    this.contractInfoForm.get('picturesExitInventory').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }




}
