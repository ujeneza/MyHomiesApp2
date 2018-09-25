export interface ContractInfo {
  id: string;
  reresidentId: string;
  inventoryEntryDate: Date;
  coldWaterIndex: number;
  hotWaterIndex: number;
  contractSignDate: Date;
  entryDate: Date;
  contractEndDate: Date;
  exitDate: Date;
  inventoryExitDate: Date;
  nextVisitDate: Date;
  contract: File | string;
  inventoryExit: File | string;
  inventoryEntry: File | string;
  exitCalculation: File | string;
  formalNoticeLetter: File | string;
  picturesEntryInventory: File | string;
  picturesExitInventory: File | string;
}
