    // tslint:disable:quotemark
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ContractInfo } from './../app-models/residant-data-models/contract-Info.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ContractResidentService {
  private contractInfos: ContractInfo[] = [];
  private contractInfosUpdated = new Subject<ContractInfo[]>();


  constructor(private http: HttpClient, private router: Router) {}
 // add an new contract
 addNewContract(
  residentId: string,
  inventoryEntryDate: Date,
  coldWaterIndex: number,
  hotWaterIndex: number,
  contractSignDate: Date,
  entryDate: Date,
  contractEndDate: Date,
  exitDate: Date,
  inventoryExitDate: Date,
  nextVisitDate: Date,
) {
  const contractInfo: ContractInfo = {
    id: null,
    residentId: residentId,
    inventoryEntryDate: inventoryEntryDate,
    coldWaterIndex: coldWaterIndex,
    hotWaterIndex: hotWaterIndex,
    contractSignDate: contractSignDate,
    contractEndDate: contractEndDate,
    entryDate: entryDate,
    exitDate: exitDate,
    inventoryExitDate: inventoryExitDate,
    nextVisitDate: nextVisitDate,
  };
  this.http
    .post<{ message: string; contractInfoId: string }>(
      'http://localhost:3000/api/contractInfo',
      contractInfo
    )
    .subscribe(responseData => {
      const id = responseData.contractInfoId;
      contractInfo.id = id;
      this.contractInfos.push(contractInfo);
      this.contractInfosUpdated.next([...this.contractInfos]);
      // this.router.navigate(['appartments']);
    });
}

/*   addNewContract(
    residentId: string,
    inventoryEntryDate: Date,
    coldWaterIndex: number,
    hotWaterIndex: number,
    contractSignDate: Date,
    entryDate: Date,
    contractEndDate: Date,
    exitDate: Date,
    inventoryExitDate: Date,
    nextVisitDate: Date,
  ) {
    console.log('Add function');
    const contractInfo: ContractInfo = {
      id: null,
      residentId: residentId,
      inventoryEntryDate: inventoryEntryDate,
      coldWaterIndex: coldWaterIndex,
      hotWaterIndex: hotWaterIndex,
      contractSignDate: contractSignDate,
      contractEndDate: contractEndDate,
      entryDate: entryDate,
      exitDate: exitDate,
      inventoryExitDate: inventoryExitDate,
      nextVisitDate: nextVisitDate,
    };
    this.http
      .post<{ message: string; contractInfoId: string }>(
        'http://localhost:3000/api/contractInfo',
        contractInfo
      )
      .subscribe(responseData => {
        const id = responseData.contractInfoId,
        contractInfo. = id;
        this.appartments.push(appartment);
        this.appartmentsUpdated.next([...this.appartments]);
        this.router.navigate(['appartments']);
      });
  } */

  // update contract

  updateContractInfo(
    id: string,
    residentId: string,
    inventoryEntryDate: Date,
    coldWaterIndex: number,
    hotWaterIndex: number,
    contractSignDate: Date,
    entryDate: Date,
    contractEndDate: Date,
    exitDate: Date,
    inventoryExitDate: Date,
    nextVisitDate: Date,
  ) {

    console.log('update function');
    const contractInfoData: ContractInfo = {
          id: id,
          residentId: residentId,
          inventoryEntryDate: inventoryEntryDate,
          coldWaterIndex: coldWaterIndex,
          hotWaterIndex: hotWaterIndex,
          contractSignDate: contractSignDate,
          contractEndDate: contractEndDate,
          entryDate: entryDate,
          exitDate: exitDate,
          inventoryExitDate: inventoryExitDate,
          nextVisitDate: nextVisitDate,
        };
        this.http
        .put("http://localhost:3000/api/contractInfo/" + residentId, contractInfoData)
        .subscribe(response => {
          const updatedContractInfos = [...this.contractInfos];
          const oldContractInfoIndex = updatedContractInfos.findIndex(p => p.id === id);
          const contractInfo = {
            id: id,
            residentId: residentId,
            inventoryEntryDate: inventoryEntryDate,
            coldWaterIndex: coldWaterIndex,
            hotWaterIndex: hotWaterIndex,
            contractSignDate: contractSignDate,
            contractEndDate: contractEndDate,
            entryDate: entryDate,
            exitDate: exitDate,
            inventoryExitDate: inventoryExitDate,
            nextVisitDate: nextVisitDate,
          };
          updatedContractInfos[oldContractInfoIndex] = contractInfo;
          this.contractInfos = updatedContractInfos;
          this.contractInfosUpdated.next([...this.contractInfos]);

        });
    }

  // get all contracts
  getResidents() {
    this.http
      .get<{ message: string; contractInfos: any }>(
        'http://localhost:3000/api/contractInfo/'
      )
      .pipe(map((contractInfoData) => {
        return contractInfoData.contractInfos.map(contractInfo => {
          return {
            id: contractInfo._id,
            residentId: contractInfo.residentId,
            inventoryEntryDate: contractInfo.inventoryEntryDate,
            coldWaterIndex: contractInfo.coldWaterIndex,
            hotWaterIndex: contractInfo.hotWaterIndex,
            contractSignDate: contractInfo.contractSignDate,
            entryDate: contractInfo.entryDate,
            contractEndDate: contractInfo.contractEndDate,
            exitDate: contractInfo.exitDate,
            inventoryExitDate: contractInfo.inventoryExitDate,
            nextVisitDate: contractInfo.nextVisitDate,
          };
        });
      }))
      .subscribe(transformedContractInfo => {
        this.contractInfos = transformedContractInfo;
        this.contractInfosUpdated.next([...this.contractInfos]);
      });
  }

  // get one contract

  getContract(residentId: string) {
    return this.http.get<ContractInfo>(
      'http://localhost:3000/api/contractInfo/' + residentId
    );
  }

// Delete contract
deleteContract(residentId: string) {
  this.http.delete('http://localhost:3000/api/contractInfo/' + residentId)
    .subscribe(() => {
      const updatedContractInfo = this.contractInfos.filter(contractInfo => contractInfo.residentId !== residentId);
      this.contractInfos = updatedContractInfo;
      this.contractInfosUpdated.next([...this.contractInfos]);
    });
}

}
