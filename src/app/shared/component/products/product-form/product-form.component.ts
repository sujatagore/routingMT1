import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from 'src/app/shared/module/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm !: FormGroup;
  productId !: string;
  productObj !: Iproducts;
  canReturn !: number;
  isinEditMode :boolean = false;

  constructor(
    private _uuidService : UuidService,
    private _productsService : ProductsService,
    private _routes : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProductForm();
    this.patchProduct();
    this.manageQueryParams();
  }

  createProductForm(){
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl(null, [Validators.required]),
      canReturn: new FormControl(null, [Validators.required]),
      productDescription: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      images: new FormControl(null, [Validators.required]),
    })
  }

  patchProduct(){
    this.productId = this._routes.snapshot.params['productId'];
    if (this.productId) {
      this.isinEditMode = true;
      this.productObj = this._productsService.getProductDetails(this.productId)!;
      this.productForm.patchValue({...this.productObj, canReturn : this.productObj.canReturn.toString()})
    } else {
      this.isinEditMode = false
    }
  }

  manageQueryParams(){
    this.canReturn = +this._routes.snapshot.queryParams['canReturn'];
    if (this.canReturn === 0) {
      this.productForm.disable();
    } else {
      this.productForm.enable();
    }
  }

  onProductAdd(){
    if (this.productForm.valid) {
      let newProduct : Iproducts = {...this.productForm.getRawValue(), pid: this._uuidService.uuid(),
                  canReturn: +this.productForm.get('canReturn')?.value}
      this._productsService.addProduct(newProduct);
    }
  }

  onProductUpdate(){
    if (this.productForm.valid) {
      let updObj : Iproducts = {...this.productForm.value, canReturn: +this.productForm.get('canReturn')?.value, pid: this.productId};
      this._productsService.updateProduct(updObj);
    }
  }

  get pc(){
    return this.productForm.controls
  }

}
