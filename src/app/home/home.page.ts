import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
products: Product[] = [];
  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) { }

  ionViewWillEnter(){
    this.getProducts();
   }  
getProducts() {
   this.api.getProducts()
      .subscribe(res => {
        this.products = res;
        console.log(this.products);
        }, err => {
        console.log(err);
       
       });
    }
drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }
}
