import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  productForm!:FormGroup

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    public _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public _shop:ShopService
  ) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }

  getTitleMessage(){
    return this?.data?._id ? 'Edit existing product':'Add a new product'
  }

  ngOnInit(): void {
    this.productForm = this._fb.group({
      name:[this.data?.name ?? '',Validators.required],
      categoryID:[this.data?.categoryID?._id ?? '',Validators.required],
      priceInteger:[this.data?.priceInteger ?? 0,Validators.required],
      priceDecimal:[this.data?.priceDecimal ?? 0, Validators.required],
      imageURL:[this.data?.priceDecimal ?? '', Validators.required],
      isInWeight:[this.data?.priceDecimal ?? false, Validators.required]
    })
  }

}
