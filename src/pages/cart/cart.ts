import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
// import { OrderConfirmPage } from "../order-confirm/order-confirm";
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { Cart } from '../../models/cart';
import { FileService } from '../../services/file-service';
import { ModalService } from '../../services/modal-service';
import { CartService } from '../../services/cart-service';
import { Store } from '@ngrx/store';
import { SigninService } from '../../services/signin-service';
import { FormDefinition } from '../../models/form-definition';
import { FormsService } from '../../services/forms-service';
import { Form } from '../../models/form';
import { Utils } from '../../services/utils-service';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  @ViewChild(Content) content: Content;
  private modelBillingAddress: Promise<Form>;
  private modelMailingAddress: Promise<Form>;
  private dataBillingAddress: any = {};
  private dataMailingAddress: any = {};
  public user: any = null;
  public cart: Cart;
  public total: number;
  private formBillingAddressDefinition = <FormDefinition>{
    fields: [
      (<any>{
        type: 'email',
        label: 'signin_email',
        name: 'username',
        required: "true"
      }),
      {
        type: 'text',
        label: 'firstname',
        name: 'firstname',
        required: "true"
      },
      {
        type: 'text',
        label: 'lastname',
        name: 'lastname',
        required: "true"
      },
      {
        type: 'text',
        label: 'city',
        name: 'city',
        required: "true"
      },
      {
        type: 'text',
        label: 'address',
        name: 'address',
        required: "true"
      },
      {
        type: 'text',
        label: 'zip',
        name: 'zip',
        required: "true"
      },
      {
        type: 'text',
        label: 'phone',
        name: 'phone',
        required: "true"
      },
      {
        type: 'checkbox',
        label: 'sameBillingAndMailingAddress',
        name: 'sameBillingAndMailingAddress',
        onchange: "sameBillingAndMailingAddress"
      }
    ]
  };
  private formMailingAddressDefinition: FormDefinition;

  constructor(
    public navCtrl: NavController,
    public fileService: FileService,
    public modalService: ModalService,
    private store: Store<string>,
    private formsService: FormsService,
    public signinService: SigninService,
    private cartService: CartService
  ) {
    let f = Utils.clone(this.formBillingAddressDefinition);
    f.fields.forEach(x => {
      delete x["required"];
    });
    f.fields.splice(f.fields.length - 1, 1);
    this.formMailingAddressDefinition = f;

    this.cartService.get().then((cart: Cart) => {
      this.cart = cart;
    });

    this.store.select('user').subscribe(() => {
      if (this.signinService.user) {
        this.user = this.signinService.user;
        this.dataBillingAddress = this.cloneAddress(this.user);
        this.dataBillingAddress.sameBillingAndMailingAddress = true;
        this.dataMailingAddress = this.cloneAddress(this.user);
        this.modelBillingAddress = this.formsService.getNewFormModel(this.formBillingAddressDefinition, true, this.dataBillingAddress);
        this.modelMailingAddress = this.formsService.getNewFormModel(this.formMailingAddressDefinition, true, this.dataMailingAddress);
      }
    });
  }

  cloneAddress(user) {
    return Utils.clone(user);
  }

  remove(item) {
    this.cartService.remove(item.item);
  }

  addQuantity(item) {
    if (item.quantity >= item.item.amount) {
      this.modalService.createToast("cart_order_amount_message").present();
    }
    this.cartService.add(item.item);
  }

  removeQuantity(item) {
    this.cartService.removeQuantity(item.item);
  }

  // place order
  buy() {
    if (!this.cart.items.find(x => x.quantity > 0)) {
      this.modalService.createToast("cart_empty_message").present();
      return;
    }

    this.modalService.showWait(
      this.cartService.checkOrder(this.cart).then(result => {
        if (result.success) {
          return this.cartService.order(this.cart).then(result => {
            this.modalService.createToast("cart_order_message").present();
            this.cartService.clear();
            this.navCtrl.setRoot(HomePage)
          });
        } else {
          return this.modalService.createToast("cart_order_amount_message").present();
        }
      }));
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  noregister() {
    this.user = {};
    this.dataBillingAddress = {};
    this.dataBillingAddress.sameBillingAndMailingAddress = true;
    this.dataMailingAddress = {};
    this.modelBillingAddress = this.formsService.getNewFormModel(this.formBillingAddressDefinition, true, this.dataBillingAddress);
    this.modelMailingAddress = this.formsService.getNewFormModel(this.formMailingAddressDefinition, true, this.dataMailingAddress);
    this.content.resize();
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
