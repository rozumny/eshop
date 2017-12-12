import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Events } from 'ionic-angular';
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
import { PostageService } from '../../services/postage-service';
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
  private modelPostage: Promise<Form>;
  private dataBillingAddress: any = {};
  private dataMailingAddress: any = {};
  private dataPostages: any = {};
  public user: any = null;
  public postageOptions: any[];
  private postages: any[];
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
  private formPostageDefinition: FormDefinition;

  constructor(
    public navCtrl: NavController,
    public fileService: FileService,
    private events: Events,
    public modalService: ModalService,
    private store: Store<string>,
    private postageService: PostageService,
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

    this.modalService.showWait(this.postageService.getAll().then((postages) => {
      this.postages = postages;
      this.postageOptions = postages.map(x => {
        return {
          label: x.title + " (" + x.price + "Kč)",
          value: x.key
        }
      });
      this.formPostageDefinition = <FormDefinition>{
        fields: [
          (<any>{
            type: 'combobox',
            label: 'postage',
            name: 'postage',
            required: "true",
            onchange: "postage",
            populateData: this.postageOptions
          })
        ]
      };

      this.modelPostage = this.formsService.getNewFormModel(this.formPostageDefinition, true, this.dataPostages);

      this.cartService.get().then((cart: Cart) => {
        this.cart = cart;
        this.dataPostages.postage = cart.postage.key ? cart.postage.key : this.postages[0].key;
        if (!this.cart.postage.key) {
          this.cart.postage = this.postages[0];
        }
        this.content.resize();
      });
    }));

    this.events.unsubscribe("postage");
    this.events.subscribe("postage", (event) => {
      this.cart.postage = this.postages.find(x => x.key === event.value);
    })

    this.store.select('user').subscribe(() => {
      if (this.signinService.user) {
        this.user = this.signinService.user;
        this.dataBillingAddress = this.cloneAddress(this.user);
        this.dataBillingAddress.sameBillingAndMailingAddress = true;
        this.dataMailingAddress = {};
        this.modelBillingAddress = this.formsService.getNewFormModel(this.formBillingAddressDefinition, true, this.dataBillingAddress);
        this.modelMailingAddress = this.formsService.getNewFormModel(this.formMailingAddressDefinition, true, this.dataMailingAddress);
      } else {
        this.user = null;
      }
      if (this.content)
        this.content.resize();
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
