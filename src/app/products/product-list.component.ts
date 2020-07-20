import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponenet implements OnInit{
  
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    _listFilter: string;
    errorMessage: any;
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products; 
      //this.filteredProducts = this.products; 
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private _service: ProductService) {
      

      
    }

     toggleImage(): void {
        this.showImage = !this.showImage;
     }

     performFilter(filterBy: string) : IProduct[] {       
        filterBy = filterBy.toLocaleLowerCase();

        console.log('performFilter: ' + filterBy);
        
        var result = this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)

        console.log('result: ' + result.length);
        return result;
     }

     onRatingClicked(message: string): void{
      this.pageTitle = 'Product List: ' + message;
     }

     ngOnInit(): void {
      this._service.getProducts().subscribe({
        next: results => {
          this.products = results;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
      
    console.log("OnInit");
  }
}