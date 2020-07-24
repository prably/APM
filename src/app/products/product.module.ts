import { NgModule } from '@angular/core';
import { ProductListComponenet } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpace } from '../shared/convertToSpace';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductListComponenet,
    ProductDetailComponent,
    ConvertToSpace    
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponenet},
      { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent},
    ]),
    SharedModule
  ]
})
export class ProductModule { }
