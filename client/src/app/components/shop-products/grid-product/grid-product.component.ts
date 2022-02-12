import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../../interfaces/product';
import { AdminDialogComponent } from '../../admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
  styleUrls: ['./grid-product.component.css'],
})
export class GridProductComponent implements OnInit, OnDestroy {
  @Input() product!: Product;

  quantity!: FormGroup;
  initialQuantityOfProduct!: number;

  valChangeSub!: Subscription;

  valueChanged = false;

  quantityChangedSub!: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    public _auth: AuthService,
    public _cart: CartService,
    public _admin: AdminService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this._auth.user) {
      this.initialQuantityOfProduct = Number(
        this._auth.user.carts[0]?.items.find(
          (prd) => prd.productID == this.product._id
        )?.quantity ?? false
      );
    }
    this.quantity = this._formBuilder.group({
      number: [
        this.initialQuantityOfProduct,
        [Validators.max(50), Validators.min(0)],
      ],
    });
    this.valChangeSub = this.quantity.valueChanges.subscribe((val) => {
      if (this._auth.user) {
        if (this._auth.user.carts[0]?.items.length) {
          const itemInCart = this._auth.user.carts[0].items.find(
            (itm) => itm.productID == this.product._id
          );
          if (itemInCart) {
            this.valueChanged = val.number != itemInCart.quantity;
          } else {
            this.valueChanged = Boolean(val.number);
          }
        } else {
          this.valueChanged = this.quantity.get('number')?.value ? true : false;
        }
      }
    });
    this.quantityChangedSub =
      this._cart.acknowledgeQuantityChangedEventEmitter.subscribe(
        (productID: string) => {
          if (productID == 'all' || productID == this.product._id)
            this.valueChanged =
              this.quantity.get('number')?.value > 0 ? true : false;
        }
      );
  }

  increment() {
    this.quantity
      .get('number')
      ?.setValue(this.quantity.get('number')?.value + 1);
  }

  decrement() {
    this.quantity
      .get('number')
      ?.setValue(this.quantity.get('number')?.value - 1);
  }

  changeProductQuantity() {
    this._cart.updateCart(this.product._id, this.quantity.get('number')?.value);

    this.valChangeSub.unsubscribe();
    this.valChangeSub = this.quantity.valueChanges.subscribe((val) => {
      if (this._auth.user) {
        if (this._auth.user.carts[0]?.items.length) {
          const itemInCart = this._auth.user.carts[0].items.find(
            (itm) => itm.productID == this.product._id
          );
          if (itemInCart) {
            this.valueChanged = val.number != itemInCart.quantity;
          } else {
            this.valueChanged = Boolean(val.number);
          }
        } else {
          this.valueChanged = this.quantity.get('number')?.value ? true : false;
        }
      }
    });

    this.valueChanged = false;
  }

  deleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogAdminComponent, {
      data: { name: this.product.name, _id: this.product._id },
    });
  }

  editDialog(): void {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: this.product,
    });
  }
  addDialog(): void {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: {},
    });
  }

  ngOnDestroy(): void {
    this.valChangeSub.unsubscribe();
    this.quantityChangedSub.unsubscribe();
  }
}

@Component({
  selector: 'app-confirm-dialog-admin',
  template: `<mat-dialog-content
      >Are you sure you'd like to permanently delete
      {{ data.name }} ?</mat-dialog-content
    ><mat-dialog-actions align="end"
      ><button mat-button mat-dialog-close cdkFocusInitial>Cancel</button
      ><button
        mat-button
        [mat-dialog-close]="true"
        (click)="_admin.deleteProduct(data._id)"
        color="warn"
      >
        Delete
      </button></mat-dialog-actions
    >`,
})
export class ConfirmDialogAdminComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; _id: string },
    public _admin: AdminService
  ) {}
}
