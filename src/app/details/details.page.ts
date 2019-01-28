import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
           
  product:Product = { _id: null, prod_name: '', prod_desc: '', prod_price: null, updated_at: null };

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router) {
   }
  
  ngOnInit() {
   this.getProduct();
   }
   getProduct() 
   {
    if(this.route.snapshot.paramMap.get('id') == 'null') 
    {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } 
    else 
    {
       this.api.getProduct(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.product = res;
          }, err => {
          console.log(err);
         });
    }
  }

    delete(id) 
    {       
      this.api.deleteProduct(id)

      .subscribe(res => {
         
       this.router.navigate([ '/tabs', { outlets: { home: 'home' } } ]);
      
      }, err => {
        console.log(err);
        });
    }
    
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate([ '/tabs', { outlets: { home: 'home' } } ]);
          }
        }
      ]
    });

    await alert.present();
  }
}
