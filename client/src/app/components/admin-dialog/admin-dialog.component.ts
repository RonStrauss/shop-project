import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { AdminService } from 'src/app/services/admin.service';
import { customValidators } from 'src/app/services/custom-validators.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css'],
})
export class AdminDialogComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    public _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public _shop: ShopService,
    public _validators: customValidators,
    public _admin: AdminService
  ) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }

  getTitleMessage() {
    return this?.data?._id ? 'Edit existing product' : 'Add a new product';
  }

  getButtonMessage() {
    return this?.data?._id ? 'Edit' : 'Add';
  }

  ngOnInit(): void {
    this._admin.getAllCategories();
    this.productForm = this._fb.group({
      name: [this.data?.name ?? '', Validators.required],
      categoryID: [this.data?.categoryID?._id ?? '', Validators.required],
      priceInteger: [
        this.data?.priceInteger ?? 0,
        [Validators.required, Validators.max(99999), Validators.min(0)],
      ],
      priceDecimal: [
        this.data?.priceDecimal ?? 0,
        [Validators.required, Validators.max(99), Validators.min(0)],
      ],
      imageURL: [this.data?.imageURL ?? '/assets/no_image_available.jpg', Validators.required],
      isInWeight: [this.data?.isInWeight ?? false, Validators.required],
    });
  }

  handleSubmit() {
    this?.data?._id
      ? this._admin.editProduct(this.productForm.value, this.data._id)
      : this._admin.addNewProduct(this.productForm.value);
  }
}
