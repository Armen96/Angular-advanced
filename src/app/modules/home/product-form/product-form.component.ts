import { Component } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  public productForm: UntypedFormGroup;

  constructor() {
    this.productForm = new UntypedFormGroup({
      title: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      price: new UntypedFormControl(0, Validators.required),
      date: new UntypedFormControl(null, Validators.required),
    });
  }

  submit() {
    // console.log(this.productForm.value);
  }
}
