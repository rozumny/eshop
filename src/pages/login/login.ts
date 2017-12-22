import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";
import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { FormDefinition } from '../../models/form-definition';
import { FormsService } from '../../services/forms-service';
import { Form } from '../../models/form';
import { ModalService } from '../../services/modal-service';
import { SigninService } from '../../services/signin-service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private modelLogin: Promise<Form>;
  private signinData: any = {};

  constructor(
    public navCtrl: NavController,
    private events: Events,
    private modalService: ModalService,
    private formsService: FormsService,
    private signinService: SigninService
  ) {
    var loginFormDefinition = <FormDefinition>{
      fields: [
        {
          type: 'email',
          label: 'signin_email',
          name: 'username',
          required: true
        }, {
          type: 'password',
          label: 'signin_password',
          name: 'password',
          required: true
        },
        {
          type: 'button',
          label: 'signin_submit',
          name: 'submit',
          onclick: "signin"
        }
      ]
    };

    this.modelLogin = this.formsService.getNewFormModel(loginFormDefinition, true, this.signinData);
  }

  // go to register page
  register() {
    this.navCtrl.push(RegisterPage);
  }

  ionViewWillEnter() {
    this.events.subscribe("signin", () => {
      this.login();
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe("signin");
  }

  login() {
    this.modelLogin.then(data => {
      if (data.authForm.valid) {
        this.modalService.showWait(this.signinService.signin(this.signinData.username, this.signinData.password)).then((user) => {
          this.navCtrl.setRoot(HomePage);
        },
          () => {
            this.modalService.createToast('signin_auth_failed').present();
          });
      }
    });
  }

  // go to forgot password page
  forgotPwd() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
