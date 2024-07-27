import { Component, OnInit } from '@angular/core';
import { Iproducts } from '../../module/product.interface';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productData !: Array<Iproducts>
  productId !: string;

  constructor(
    private _productService : ProductsService,
    private _routes : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productData = this._productService.fetchAllProducts()
  }

}
