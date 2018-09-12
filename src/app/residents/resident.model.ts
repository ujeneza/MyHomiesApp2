export interface Resident {
 id: string;
  firstName: string;
  lastName: string;
 appartmentInfo: any; /* [
      {idRoom: 'SS_AV', nameRoom: 'Sous-Sol Avant'},
      {idRoom: 'SS_AR', nameRoom: 'Sous-Sol Arrière'},
      {idRoom: '00_AV', nameRoom: 'Rez-de chaussée Avant'},
      {idRoom: '00_AR', nameRoom: 'Rez-de chaussée Arrière'},
      {idRoom: '01_AV', nameRoom: '1er étage Avant'},
      {idRoom: '01_AR', nameRoom: '1er étage Arrière'},
      {idRoom: '02_AV', nameRoom: '2er étage Avant'},
      {idRoom: '02_AR', nameRoom: '2er étage Arrière'}
    ], */

    isRentPaid: boolean;
    phoneNumber: number;
    rent: number;
   contractEndDate: Date;
  nextVisitDate: Date;
  imagePath: string | File;

}
