import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninService } from "../../services/signin-service";
import { ModalService } from "../../services/modal-service";

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  public username: string;
  public password: string;
  public password_repeat: string;
  public code: string;
  public isCodeSent: boolean = false;

  constructor(
    public nav: NavController,
    private signinService: SigninService,
    private modalService: ModalService
  ) {
  }

  sendCode() {
    this.modalService.showWait(this.signinService.sendcode({
      username: this.username
    }).then((data) => {
      if (data.success) {
        this.isCodeSent = true;
        this.modalService.createToast("signin_send_success").present();
      } else {
        this.modalService.createToast("signin_send_failed").present();
      }
    }, () => {
      this.modalService.createToast("signin_send_failed").present();
    }));
  }

  reset() {
    if (this.password !== this.password_repeat) {
      this.modalService.createToast("signin_password_notmatch").present();
      return;
    }
    this.modalService.showWait(this.signinService.resetpassword({
      username: this.username,
      password: this.password,
      code: this.code
    }).then((data) => {
      if (data.success) {
        this.modalService.createToast("signin_reset_success").present();
        this.nav.pop();
      } else {
        this.modalService.createToast("signin_reset_failed").present();
      }
    }, () => {
      this.modalService.createToast("signin_reset_failed").present();
    }));
  }
}
