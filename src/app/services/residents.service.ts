


// tslint:disable:quotemark
 // tslint:disable:max-line-length
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Resident } from "../residents/resident.model";
import { Injectable } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({

  providedIn: "root"
})
export class ResidentsService {
  private residents: Resident[] = [];
  private residentsUpdated = new Subject<Resident[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getResidents() {
    this.http
      .get<{ message: string; residents: any }>(
        "http://localhost:3000/api/residents"
      )
      .pipe(map((residentData) => {
        return residentData.residents.map(resident => {
          return {
            id: resident._id,
            lastName: resident.lastName,
            firstName: resident.firstName,
            appartmentInfo: resident.appartmentInfo,
            isRentPaid: resident.isRentPaid,
            phoneNumber: resident.phoneNumber,
            rent: resident.rent,
            contractEndDate: resident.contractEndDate,
            nextVisitDate: resident.nextVisitDate,
            imagePath: resident.imagePath
          };
        });
      }))
      .subscribe(transformedresidents => {
        this.residents = transformedresidents;
        this.residentsUpdated.next([...this.residents]);
      });
  }


  emitResident() {
    this.residentsUpdated.next([...this.residents]);
  }

  getResidentUpdateListener() {
    return this.residentsUpdated.asObservable();
  }


  addNewResident(
    lastName: string,
    firstName: string,
    appartmentInfo: any,
    isRentPaid: boolean,
    phoneNumber: number,
    rent: number,
    contractEndDate: Date,
    nextVisitDate: Date,
    image: File
  ) {
    const residentData = new FormData();
    residentData.append("lastName", lastName);
    residentData.append("firstName", firstName);
    residentData.append("appartmentInfo", appartmentInfo);
    residentData.append("isRentPaid", isRentPaid.toString());
    residentData.append("phoneNumber", phoneNumber.toString());
    residentData.append("rent", rent.toString());
    residentData.append("contractEndDate", contractEndDate.toString());
    residentData.append( "nextVisitDate",  nextVisitDate.toString());
    residentData.append( "image", image, lastName);

    this.http.post<{ message: string; resident: Resident }>
    (
      'http://localhost:3000/api/residents',
      residentData
    ).subscribe(responseData => {
      const resident: Resident = {
        id: responseData.resident.id,
        lastName: lastName,
            firstName: firstName,
            appartmentInfo: appartmentInfo,
            isRentPaid: isRentPaid,
            phoneNumber: phoneNumber,
            rent: rent,
            contractEndDate: contractEndDate,
            nextVisitDate: nextVisitDate,
            imagePath: responseData.resident.imagePath
      };
      this.residents.push(resident);
      this.emitResident();
      this.router.navigate(["resident"]);
    });
  }

  deleteResident(residentId: string) {
    this.http.delete("http://localhost:3000/api/residents/" + residentId)
      .subscribe(() => {
        const updatedResident = this.residents.filter(resident => resident.id !== residentId);
        this.residents = updatedResident;
        this.emitResident();
      });
  }

  getResident(id: string) {
    return this.http.get<Resident>(
      "http://localhost:3000/api/residents/" + id
    );
  }
  getResident2(id: string) {
    return this.http.get<{
      _id: string;
      lastName: string;
      firstName: string;
      appartmentInfo: any;
      isRentPaid: boolean;
      phoneNumber: number;
      rent: number;
      contractEndDate: Date;
      nextVisitDate: Date;
      imagePath: File }>(
      "http://localhost:3000/api/residents/" + id
    );
  }


  updateResident(id: string,
    lastName: string,
    firstName: string,
    appartmentInfo: any,
    isRentPaid: boolean,
    phoneNumber: number,
    rent: number,
    contractEndDate: Date,
    nextVisitDate: Date,
    image: File | string
  ) {
      let residentData: Resident | FormData;
      if (typeof image === "object") {
     residentData = new FormData();
     residentData.append("id", id);
    residentData.append("lastName", lastName);
    residentData.append("firstName", firstName);
    residentData.append("appartmentInfo", appartmentInfo);
    residentData.append("isRentPaid", isRentPaid.toString());
    residentData.append("phoneNumber", phoneNumber.toString());
    residentData.append("rent", rent.toString());
    residentData.append("contractEndDate", contractEndDate.toString());
    residentData.append( "nextVisitDate",  nextVisitDate.toString());
    residentData.append( "image", image, lastName);
      } else {
        residentData = {
          id: id,
          lastName: lastName,
              firstName: firstName,
              appartmentInfo: appartmentInfo,
              isRentPaid: isRentPaid,
              phoneNumber: phoneNumber,
              rent: rent,
              contractEndDate: contractEndDate,
              nextVisitDate: nextVisitDate,
              imagePath: image

        };
      }
        this.http
        .put("http://localhost:3000/api/residents/" + id, residentData)
        .subscribe(response => {
          const updatedResidents = [...this.residents];
          const oldResidentIndex = updatedResidents.findIndex(p => p.id === id);
          const resident = {
            id: id,
            lastName: lastName,
                firstName: firstName,
                appartmentInfo: appartmentInfo,
                isRentPaid: isRentPaid,
                phoneNumber: phoneNumber,
                rent: rent,
                contractEndDate: contractEndDate,
                nextVisitDate: nextVisitDate,
                imagePath: image
          };
          updatedResidents[oldResidentIndex] = resident;
          this.residents = updatedResidents;
          this.residentsUpdated.next([...this.residents]);
          this.router.navigate(["resident"]);

        });
    }

 /*  updateResident(residentId: string, resident: Resident): Observable<any> {
    const id: Resident = { id: residentId} as Resident;
    console.log(id);
     return this.http.put("http://localhost:3000/api/residents/" + id, resident, httpOptions);


  } */


/* updateResident(
    id: string,
    lastName: string,
    firstName: string,
    appartmentInfo: any,
    isRentPaid: boolean,
    phoneNumber: number,
    rent: number,
    contractEndDate: Date,
    nextVisitDate: Date) {
      const resident: Resident = {
        id: _id,
        lastName: lastName,
        firstName: firstName,
        appartmentInfo: appartmentInfo,
        isRentPaid: isRentPaid,
        phoneNumber: phoneNumber,
        rent: rent,
        contractEndDate: contractEndDate,
        nextVisitDate: nextVisitDate};
        this.http
        .put("http://localhost:3000/api/residents/" + _id, resident)
        .subscribe(response => {
          const updatedResidents = [...this.residents];
          const oldResidentIndex = updatedResidents.findIndex(p => p.id === resident.id);
          updatedResidents[oldResidentIndex] = resident;
          this.residents = updatedResidents;
          this.residentsUpdated.next([...this.residents]);
          this.router.navigate(["resident"]);
        });
    }




 /*  getSingleResident(residentId: string) {
    this.http.get("http://localhost:3000/api/residents/" + residentId)
    .subscribe(()=>{})
  }
 */
}