import { Appartment } from './../app-models/residant-data-models/appartment-info.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppartmentsService {
  private appartments: Appartment[] = [];
  private appartmentsUpdated = new Subject<Appartment[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // Add new appartment
  addAppartment(
    appartmentCodeName: string,
    appartmentName: string,
    rent: number,
    monthlyExpenses: number,
    eanNumber: number,
    electricityMeter: number,
    hotWaterMeter: number,
    coldWaterMeter: number,
    appartmentWarranty: number
  ) {
    const appartment: Appartment = {
      id: null,
      appartmentCodeName: appartmentCodeName,
      appartmentName: appartmentName,
      rent: rent,
      monthlyExpenses: monthlyExpenses,
      eanNumber: eanNumber,
      electricityMeter: electricityMeter,
      hotWaterMeter: hotWaterMeter,
      coldWaterMeter: coldWaterMeter,
      appartmentWarranty: appartmentWarranty
    };
    this.http
      .post<{ message: string; appartmentId: string }>(
        'http://localhost:3000/api/appartments',
        appartment
      )
      .subscribe(responseData => {
        const id = responseData.appartmentId;
        appartment.id = id;
        this.appartments.push(appartment);
        this.appartmentsUpdated.next([...this.appartments]);
        this.router.navigate(['appartments']);
      });

  }

  // View all appartments
  getAppartments() {
    this.http
      .get<{ message: string; appartments: any }>(
        'http://localhost:3000/api/appartments/'
      )
      .pipe(
        map(appartmentData => {
          return appartmentData.appartments.map(appartment => {
            return {
              id: appartment._id,
              appartmentCodeName: appartment.appartmentCodeName,
              appartmentName: appartment.appartmentName,
              rent: appartment.rent,
              monthlyExpenses: appartment.monthlyExpenses,
              eanNumber: appartment.eanNumber,
              electricityMeter: appartment.electricityMeter,
              hotWaterMeter: appartment.hotWaterMeter,
              coldWaterMeter: appartment.coldWaterMeter,
              appartmentWarranty: appartment.appartmentWarranty
            };
          });
        })
      )
      .subscribe(transformedAppartments => {
        this.appartments = transformedAppartments;
        this.appartmentsUpdated.next([...this.appartments]);
        // this.router.navigate(['appartments']);
      });
  }
  // View one appartment
  getAppartment(id: string) {
    return this.http.get<Appartment>(
      'http://localhost:3000/api/appartments/' + id
    );
  }
  // Update an appartment
  updateAppartment(
    id: string,
    appartmentCodeName: string,
    appartmentName: string,
    rent: number,
    monthlyExpenses: number,
    eanNumber: number,
    electricityMeter: number,
    hotWaterMeter: number,
    coldWaterMeter: number,
    appartmentWarranty: number
  ) {
    const appartment: Appartment = {
      id: id,
      appartmentCodeName: appartmentCodeName,
      appartmentName: appartmentName,
      rent: rent,
      monthlyExpenses: monthlyExpenses,
      eanNumber: eanNumber,
      electricityMeter: electricityMeter,
      hotWaterMeter: hotWaterMeter,
      coldWaterMeter: coldWaterMeter,
      appartmentWarranty: appartmentWarranty
    };
    this.http
      .put('http://localhost:3000/api/appartments/' + id, appartment)
      .subscribe(response => {
        const updatedAppartments = [...this.appartments];
        const oldAppartmentIndex = updatedAppartments.findIndex(
          p => p.id === appartment.id
        );
        updatedAppartments[oldAppartmentIndex] = appartment;
        this.appartments = updatedAppartments;
        this.appartmentsUpdated.next([...this.appartments]);
        this.router.navigate(['appartments']);
      });
  }
  // Delete an appartment
  deleteAppartment(appartmentId: string) {
    this.http
      .delete('http://localhost:3000/api/appartments/' + appartmentId)
      .subscribe(() => {
        const updatedAppartments = this.appartments.filter(
          appartment => appartment.id !== appartmentId
        );
        this.appartments = updatedAppartments;
        this.appartmentsUpdated.next([...this.appartments]);
        this.router.navigate(['appartments']);
      });
  }

  // observable

  getAppartmentUpdateListener() {
    return this.appartmentsUpdated.asObservable();
  }
}
