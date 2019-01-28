import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.scss']
})
export class EditPage {

  productForm: FormGroup;
  ProductId:any='';
  prod_name:string='';
  prod_desc:string='';
  prod_price:number=null;

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required]
    });

  }

  async getProduct(id) {
    if(this.route.snapshot.paramMap.get('id') == 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
        await this.api.getProduct(id)
        .subscribe(data => {
          console.log(data)
          this.ProductId = data.id;
          console.log(this.ProductId)
          this.productForm.setValue({
            prod_name: data.prod_name,
            prod_desc: data.prod_desc,
            prod_price: data.prod_price
          });
         }, err => {
          console.log(err);
        });
    }

  }

onFormSubmit(form:NgForm) {
       
        this.api.updateProduct(this.ProductId,form)
       .subscribe(data => {
          let id = data['id'];
          this.router.navigate([ '/tabs', { outlets: { home: 'home' } } ]);
        }, (err) => {
          console.log(err);
        }
      );
     }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

}
