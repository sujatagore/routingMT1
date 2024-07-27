import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from 'src/app/shared/module/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productId !: string;
  productObj !: Iproducts;

  constructor(
    private _routes : ActivatedRoute,
    private _productService : ProductsService
  ) { }

  ngOnInit(): void {
    this._routes.params
      .subscribe(res =>{
        this.productId = res['productId'];
        if (this.productId) {
          this.productObj = this._productService.getProductDetails(this.productId)!;
        }
      })
  }

  onRemoveProduct(){
    if (this.productId) {
      this._productService.removeProduct(this.productId)
    }
  }
}
