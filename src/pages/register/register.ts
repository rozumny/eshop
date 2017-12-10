import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { FormDefinition } from '../../models/form-definition';
import { FormsService } from '../../services/forms-service';
import { Form } from '../../models/form';
import { ModalService } from '../../services/modal-service';
import { SigninService } from '../../services/signin-service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private model: Promise<Form>;
  private data: any = {};

  constructor(
    public navCtrl: NavController,
    private events: Events,
    private modalService: ModalService,
    private formsService: FormsService,
    private signinService: SigninService
  ) {
    var formDefinition = <FormDefinition>{
      fields: [
        {
          type: 'email',
          label: 'signin_email',
          name: 'username',
          required: "true"
        }, {
          type: 'password',
          label: 'signin_password',
          name: 'password',
          required: "true"
        },
        {
          type: 'password',
          label: 'signin_password_repeat',
          name: 'password_repeat',
          required: "true"
        },
        {
          type: 'text',
          label: 'firstname',
          name: 'firstname'
        },
        {
          type: 'text',
          label: 'lastname',
          name: 'lastname'
        },
        {
          type: 'text',
          label: 'city',
          name: 'city'
        },
        {
          type: 'text',
          label: 'address',
          name: 'address'
        },
        {
          type: 'text',
          label: 'zip',
          name: 'zip'
        },
        {
          type: 'text',
          label: 'phone',
          name: 'phone'
        },
        {
          type: 'button',
          label: 'register_button',
          name: 'submit',
          onclick: "register"
        }
      ]
    };

    this.model = this.formsService.getNewFormModel(formDefinition, true, this.data);
  }

  // go to login page
  login() {
    this.navCtrl.push(LoginPage);
  }

  // go to home page
  register() {
    this.model.then(data => {
      if (data.authForm.valid) {
        this.modalService.showWait(this.signinService.register(this.data.username, this.data.password, this.data.password_repeat, this.data.email)).then((user) => {
          this.navCtrl.setRoot(HomePage);
        },
          () => {
            this.modalService.createToast('signin_auth_failed').present();
          });
      }
    });
  }
}
