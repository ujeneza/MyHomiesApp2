export interface Resident {
 id: string;
  firstName: string;
  lastName: string;
 appartmentInfo: any;
    isRentPaid: boolean;
    phoneNumber: number;
    rent: number;
   contractEndDate: Date;
  nextVisitDate: Date;
  imagePath: string | File;

}
