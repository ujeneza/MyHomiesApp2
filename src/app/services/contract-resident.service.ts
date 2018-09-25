    // tslint:disable:quotemark
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ContractInfo } from './../app-models/residant-data-models/contract-Info.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ContractResidentService {
  private contractInfos: ContractInfo[] = [];
  private contractInfosUpdated = new Subject<ContractInfo[]>();


  constructor(private http: HttpClient, private router: Router) {}
 // add an new contract
  addNewContract(
    reresidentId: string,
    inventoryEntryDate: Date,
    coldWaterIndex: number,
    hotWaterIndex: number,
    contractSignDate: Date,
    entryDate: Date,
    contractEndDate: Date,
    exitDate: Date,
    inventoryExitDate: Date,
    nextVisitDate: Date,
    contract: File,
    inventoryExit: File,
    inventoryEntry: File,
    exitCalculation: File,
    formalNoticeLetter: File,
    picturesEntryInventory: File,
    picturesExitInventory: File
  ) {
    const contractInfoData = new FormData();
    contractInfoData.append("reresidentId", reresidentId);
    contractInfoData.append("inventoryEntryDate", inventoryEntryDate.toString());
    contractInfoData.append("coldWaterIndex", coldWaterIndex.toString());
    contractInfoData.append("hotWaterIndex", hotWaterIndex.toString());
    contractInfoData.append("contractSignDate", contractSignDate.toString());
    contractInfoData.append("entryDate", entryDate.toString());
    contractInfoData.append("contractEndDate", contractEndDate.toString());
    contractInfoData.append("exitDate", exitDate.toString());
    contractInfoData.append("inventoryExitDate", inventoryExitDate.toString());
    contractInfoData.append("nextVisitDate", nextVisitDate.toString());
    contractInfoData.append("contract", contract);
    contractInfoData.append("inventoryExit", inventoryExit);
    contractInfoData.append("inventoryEntry", inventoryEntry);
    contractInfoData.append("exitCalculation", exitCalculation);
    contractInfoData.append("formalNoticeLetter", formalNoticeLetter);
    contractInfoData.append("picturesEntryInventory", picturesEntryInventory);
    contractInfoData.append("picturesExitInventory", picturesExitInventory);

    this.http
      .post<{ message: string; contractInfo: ContractInfo }>(
        'http://localhost:3000/api/residents/contractInfos',
        contractInfoData
      )
      .subscribe(responseData => {
        const contractInfo: ContractInfo = {
          id: responseData.contractInfo.id,
          reresidentId: reresidentId,
          inventoryEntryDate: inventoryEntryDate,
          coldWaterIndex: coldWaterIndex,
          hotWaterIndex: hotWaterIndex,
          contractSignDate: contractSignDate,
          contractEndDate: contractEndDate,
          entryDate: entryDate,
          exitDate: exitDate,
          inventoryExitDate: inventoryExitDate,
          nextVisitDate: nextVisitDate,
          contract: responseData.contractInfo.contract,
          inventoryExit: responseData.contractInfo.inventoryExit,
          inventoryEntry: responseData.contractInfo.inventoryEntry,
          exitCalculation: responseData.contractInfo.exitCalculation,
          formalNoticeLetter: responseData.contractInfo.formalNoticeLetter,
          picturesExitInventory: responseData.contractInfo.picturesExitInventory,
          picturesEntryInventory: responseData.contractInfo.picturesEntryInventory,
        };
        this.contractInfos.push(contractInfo);
        this.contractInfosUpdated.next([...this.contractInfos]);
        this.router.navigate(['resident']);
      });
  }

  // update contract

  updateContractInfo(
    id: string,
    reresidentId: string,
    inventoryEntryDate: Date,
    coldWaterIndex: number,
    hotWaterIndex: number,
    contractSignDate: Date,
    entryDate: Date,
    contractEndDate: Date,
    exitDate: Date,
    inventoryExitDate: Date,
    nextVisitDate: Date,
    contract: (File | string),
    inventoryExit: (File | string),
    inventoryEntry: (File | string),
    exitCalculation: (File | string),
    formalNoticeLetter: (File | string),
    picturesEntryInventory: (File | string),
    picturesExitInventory: File | string
  ) {
    let contractInfoData: FormData | ContractInfo;
      if ((typeof inventoryExit || contract || inventoryEntry || exitCalculation ||
        formalNoticeLetter || picturesEntryInventory || picturesExitInventory  === "object")) {

        contractInfoData = new FormData();
        contractInfoData.append("id", id);
        contractInfoData.append("reresidentId", reresidentId);
        contractInfoData.append("inventoryEntryDate", inventoryEntryDate.toString());
        contractInfoData.append("coldWaterIndex", coldWaterIndex.toString());
        contractInfoData.append("hotWaterIndex", hotWaterIndex.toString());
        contractInfoData.append("contractSignDate", contractSignDate.toString());
        contractInfoData.append("entryDate", entryDate.toString());
        contractInfoData.append("contractEndDate", contractEndDate.toString());
        contractInfoData.append("exitDate", exitDate.toString());
        contractInfoData.append("inventoryExitDate", inventoryExitDate.toString());
        contractInfoData.append("nextVisitDate", nextVisitDate.toString());
        contractInfoData.append("contract", contract, id);
        contractInfoData.append("inventoryExit", inventoryExit, id);
        contractInfoData.append("inventoryEntry", inventoryEntry, id);
        contractInfoData.append("exitCalculation", exitCalculation, id);
        contractInfoData.append("formalNoticeLetter", formalNoticeLetter, id);
        contractInfoData.append("picturesEntryInventory", picturesEntryInventory, id);
        contractInfoData.append("picturesExitInventory", picturesExitInventory, id);
      } else {

        contractInfoData = {
          id: id,
          reresidentId: reresidentId,
          inventoryEntryDate: inventoryEntryDate,
          coldWaterIndex: coldWaterIndex,
          hotWaterIndex: hotWaterIndex,
          contractSignDate: contractSignDate,
          contractEndDate: contractEndDate,
          entryDate: entryDate,
          exitDate: exitDate,
          inventoryExitDate: inventoryExitDate,
          nextVisitDate: nextVisitDate,
          contract: contract.toString(),
          inventoryExit: inventoryExit.toString(),
          inventoryEntry: inventoryEntry.toString(),
          exitCalculation: exitCalculation.toString(),
          formalNoticeLetter: formalNoticeLetter.toString(),
          picturesExitInventory: picturesExitInventory.toString(),
          picturesEntryInventory: picturesEntryInventory.toString(),
        };
      }
        this.http
        .put("http://localhost:3000/api/residents/contractInfos" + id, contractInfoData)
        .subscribe(response => {
          const updatedContractInfos = [...this.contractInfos];
          const oldContractInfoIndex = updatedContractInfos.findIndex(p => p.id === id);
          const contractInfo = {
            id: id,
            reresidentId: reresidentId,
            inventoryEntryDate: inventoryEntryDate,
            coldWaterIndex: coldWaterIndex,
            hotWaterIndex: hotWaterIndex,
            contractSignDate: contractSignDate,
            contractEndDate: contractEndDate,
            entryDate: entryDate,
            exitDate: exitDate,
            inventoryExitDate: inventoryExitDate,
            nextVisitDate: nextVisitDate,
            contract: contract,
            inventoryExit: inventoryExit,
            inventoryEntry: inventoryEntry,
            exitCalculation: exitCalculation,
            formalNoticeLetter: formalNoticeLetter,
            picturesExitInventory: picturesExitInventory,
            picturesEntryInventory: picturesEntryInventory,
          };
          updatedContractInfos[oldContractInfoIndex] = contractInfo;
          this.contractInfos = updatedContractInfos;
          this.contractInfosUpdated.next([...this.contractInfos]);
          this.router.navigate(['resident']);

        });
    }

  // get all contracts
  getResidents() {
    this.http
      .get<{ message: string; contractInfos: any }>(
        'http://localhost:3000/api/residents/contractInfos'
      )
      .pipe(map((contractInfoData) => {
        return contractInfoData.contractInfos.map(contractInfo => {
          return {
            id: contractInfo._id,
            reresidentId: contractInfo.reresidentId,
            inventoryEntryDate: contractInfo.inventoryEntryDate,
            coldWaterIndex: contractInfo.coldWaterIndex,
            hotWaterIndex: contractInfo.hotWaterIndex,
            contractSignDate: contractInfo.contractSignDate,
            entryDate: contractInfo.entryDate,
            contractEndDate: contractInfo.contractEndDate,
            exitDate: contractInfo.exitDate,
            inventoryExitDate: contractInfo.inventoryExitDate,
            nextVisitDate: contractInfo.nextVisitDate,
            contract: contractInfo.contract,
            inventoryExit: contractInfo.inventoryExit,
            inventoryEntry: contractInfo.inventoryEntry,
            exitCalculation: contractInfo.exitCalculation,
            formalNoticeLetter: contractInfo.formalNoticeLetter,
            picturesEntryInventory: contractInfo.picturesEntryInventory,
            picturesExitInventory: contractInfo.picturesExitInventory,
          };
        });
      }))
      .subscribe(transformedContractInfo => {
        this.contractInfos = transformedContractInfo;
        this.contractInfosUpdated.next([...this.contractInfos]);
      });
  }

  // get one contract

  getContract(id: string) {
    return this.http.get<ContractInfo>(
      'http://localhost:3000/api/residents/contractInfos' + id
    );
  }

// Delete contract
deleteContract(contractId: string) {
  this.http.delete('http://localhost:3000/api/residents/contractInfos' + contractId)
    .subscribe(() => {
      const updatedContractInfo = this.contractInfos.filter(contractInfo => contractInfo.id !== contractId);
      this.contractInfos = updatedContractInfo;
      this.contractInfosUpdated.next([...this.contractInfos]);
    });
}

}
