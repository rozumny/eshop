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
import { AdminService } from '../../services/admin-service';
import { PostageService } from '../../services/postage-service';
import { PaymentService } from '../../services/payment-service';
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
  private modelPayment: Promise<Form>;
  private dataBillingAddress: any = {};
  private dataMailingAddress: any = {};
  private dataPostages: any = {};
  private dataPayments: any = {};
  public user: any = null;
  public postageOptions: any[];
  private postages: any[];
  public paymentOptions: any[];
  private payments: any[];
  public cart: Cart;
  public total: number;
  private formBillingAddressDefinition = <FormDefinition>{
    fields: [
      (<any>{
        type: 'email',
        label: 'signin_email',
        name: 'username',
        required: true
      }),
      {
        type: 'text',
        label: 'firstname',
        name: 'firstname',
        required: true
      },
      {
        type: 'text',
        label: 'lastname',
        name: 'lastname',
        required: true
      },
      {
        type: 'text',
        label: 'city',
        name: 'city',
        required: true
      },
      {
        type: 'text',
        label: 'address',
        name: 'address',
        required: true
      },
      {
        type: 'text',
        label: 'zip',
        name: 'zip',
        required: true
      },
      {
        type: 'text',
        label: 'phone',
        name: 'phone',
        required: true
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
  private formPaymentDefinition: FormDefinition;
  public authForm: any = {};

  constructor(
    public navCtrl: NavController,
    public fileService: FileService,
    private adminService: AdminService,
    private events: Events,
    public modalService: ModalService,
    private store: Store<string>,
    private postageService: PostageService,
    private paymentService: PaymentService,
    private formsService: FormsService,
    public signinService: SigninService,
    private cartService: CartService
  ) {
    let f = Utils.clone(this.formBillingAddressDefinition);
    f.fields.forEach(x => {
      delete x["required"];
    });
    f.fields.splice(0, 1);
    f.fields.splice(f.fields.length - 1, 1);
    this.formMailingAddressDefinition = f;

    let promises = [];
    promises.push(this.postageService.getAll());
    promises.push(this.paymentService.getAll())

    this.modalService.showWait(Promise.all(promises).then(result => {
      let postages = result[0];
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
            required: true,
            onchange: "postage",
            populateData: this.postageOptions
          })
        ]
      };

      this.modelPostage = this.formsService.getNewFormModel(this.formPostageDefinition, true, this.dataPostages);

      let payments = result[1];
      this.payments = payments;
      this.paymentOptions = payments.map(x => {
        return {
          label: x.title + " (" + x.price + "Kč)",
          value: x.key
        }
      });
      this.formPaymentDefinition = <FormDefinition>{
        fields: [
          (<any>{
            type: 'combobox',
            label: 'payment',
            name: 'payment',
            required: true,
            onchange: "payment",
            populateData: this.paymentOptions
          })
        ]
      };

      this.modelPayment = this.formsService.getNewFormModel(this.formPaymentDefinition, true, this.dataPayments);

      this.cartService.get().then((cart: Cart) => {
        this.cart = cart;
        this.dataPostages.postage = cart.postage.key ? cart.postage.key : this.postages[0].key;
        if (!this.cart.postage.key) {
          this.cart.postage = this.postages[0];
        }
        this.dataPayments.payment = cart.payment.key ? cart.payment.key : this.payments[0].key;
        if (!this.cart.payment.key) {
          this.cart.payment = this.payments[0];
        }
        this.content.resize();
      });
    }));

    this.events.unsubscribe("postage");
    this.events.subscribe("postage", (event) => {
      this.cart.postage = this.postages.find(x => x.key === event.value);
    })

    this.events.unsubscribe("payment");
    this.events.subscribe("payment", (event) => {
      this.cart.payment = this.payments.find(x => x.key === event.value);
    })

    this.store.select('user').subscribe(() => {
      if (this.signinService.user) {
        this.user = this.signinService.user;
        this.dataBillingAddress = this.cloneAddress(this.user);
        this.dataBillingAddress.sameBillingAndMailingAddress = true;
        this.dataMailingAddress = {};
        this.modelBillingAddress = this.formsService.getNewFormModel(this.formBillingAddressDefinition, true, this.dataBillingAddress);
        this.modelMailingAddress = this.formsService.getNewFormModel(this.formMailingAddressDefinition, true, this.dataMailingAddress);
        this.bindBuyButton();
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

    // if(this.modelBillingAddress)

    this.modalService.showWait(
      this.cartService.checkOrder(this.cart).then(result => {
        if (result.success) {
          if (this.signinService.user) {
            this.cart.userId = this.signinService.user._id;
          }
          if (this.adminService.idParam) {
            this.cart.adminId = this.adminService.idParam;
          }

          this.cart.billingaddress = this.dataBillingAddress;
          this.cart.mailingaddress = this.dataMailingAddress;

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
    this.bindBuyButton();
    this.content.resize();
  }

  bindBuyButton() {
    this.modelBillingAddress.then(modelBillingAddressForm => {
      this.modelMailingAddress.then(modelMailingAddressForm => {
        this.authForm = modelBillingAddressForm.authForm;
      });
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
