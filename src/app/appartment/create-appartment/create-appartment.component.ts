import { Appartment } from './../../app-models/residant-data-models/appartment-info.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppartmentsService } from './../../services/appartment.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-appartment',
  templateUrl: './create-appartment.component.html',
  styleUrls: ['./create-appartment.component.scss']
})
export class CreateAppartmentComponent implements OnInit {
  appartmentForm: FormGroup;
  private mode = 'appartment/new';
  isLoading = false;
  appartmentId: string;
  appartment: Appartment;

  constructor(
    private formBuilder: FormBuilder,
    private appartmentsService: AppartmentsService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
  }

  // Init form
  initForm() {
    this.appartmentForm = new FormGroup({
      appartmentCodeName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      appartmentName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      rent: new FormControl(null, {
        validators: [Validators.required]
      }),
      monthlyExpenses: new FormControl(null, { validators: [Validators.required] }),
      eanNumber: new FormControl(null, { validators: [Validators.required] }),
      electricityMeter: new FormControl(null, { validators: [Validators.required] }),
      hotWaterMeter: new FormControl(null, {
        validators: [Validators.required]
      }),
      coldWaterMeter: new FormControl(null, {
        validators: [Validators.required]
      }),
      appartmentWarranty: new FormControl(null, {
        validators: [Validators.minLength(3)]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'appartment/edit';
        this.appartmentId = paramMap.get('id');
        this.isLoading = true;
        this.appartmentsService.getAppartment(this.appartmentId).subscribe(appartmentData => {
          this.isLoading = false;
          this.appartment = {
            id: appartmentData.id,
            appartmentCodeName: appartmentData.appartmentCodeName,
            appartmentName: appartmentData.appartmentName,
            rent: appartmentData.rent,
            monthlyExpenses: appartmentData.monthlyExpenses,
            eanNumber: appartmentData.eanNumber,
            electricityMeter: appartmentData.electricityMeter,
            hotWaterMeter: appartmentData.hotWaterMeter,
            coldWaterMeter: appartmentData.coldWaterMeter,
            appartmentWarranty: appartmentData.appartmentWarranty
          };
          this.appartmentForm.setValue({
            appartmentCodeName: this.appartment.appartmentCodeName,
              appartmentName:  this.appartment.appartmentName,
              rent: this.appartment.rent,
              monthlyExpenses:  this.appartment.monthlyExpenses,
              eanNumber:  this.appartment.eanNumber,
              electricityMeter:  this.appartment.electricityMeter,
              hotWaterMeter:  this.appartment.hotWaterMeter,
              coldWaterMeter:  this.appartment.coldWaterMeter,
              appartmentWarranty:  this.appartment.appartmentWarranty
          });
        });
      } else {
        this.mode = 'appartment/new';
        this.appartmentId = null;
      }
    });

  }

  // save appartment when creating and updating

  onSaveAppartment() {
    if (this.appartmentForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'appartment/new') {
      this.appartmentsService.addAppartment(
        this.appartmentForm.value.appartmentCodeName,
        this.appartmentForm.value.appartmentName,
        this.appartmentForm.value.rent,
        this.appartmentForm.value.monthlyExpenses,
        this.appartmentForm.value.eanNumber,
        this.appartmentForm.value.electricityMeter,
        this.appartmentForm.value.hotWaterMeter,
        this.appartmentForm.value.coldWaterMeter,
        this.appartmentForm.value.appartmentWarranty,

      );
    } else {
      this.appartmentsService.updateAppartment(
        this.appartmentId,
        this.appartmentForm.value.appartmentCodeName,
        this.appartmentForm.value.appartmentName,
        this.appartmentForm.value.rent,
        this.appartmentForm.value.monthlyExpenses,
        this.appartmentForm.value.eanNumber,
        this.appartmentForm.value.electricityMeter,
        this.appartmentForm.value.hotWaterMeter,
        this.appartmentForm.value.coldWaterMeter,
        this.appartmentForm.value.appartmentWarranty,
      );
    }
    this.appartmentForm.reset();
  }

  // Select an appartment and update




}






