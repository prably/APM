import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  products: IProduct[];
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _service: ProductService) {
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`; 

    this._service.getProducts().subscribe({
      next: results => {
        this.products = results;
        this.product = this.products.find(p=> p.productId === id);
      },
      error: err => this.errorMessage = err
    });
    
  console.log("OnInit");

    
    
    
    // this.product = {
    //   "productId": 1,
    //   "productName": "Leaf Rake",
    //   "productCode": "GDN-0011",
    //   "releaseDate": "March 19, 2019",
    //   "description": "Leaf rake with 48-inch wooden handle.",
    //   "price": 19.95,
    //   "starRating": 3.2,
    //   "imageUrl": "assets/images/leaf_rake.png"
    // };
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
