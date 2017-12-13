import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninService } from '../../services/signin-service';
import { ChangePasswordPage } from "../change-password/change-password";
import { FormDefinition } from '../../models/form-definition';
import { FormsService } from '../../services/forms-service';
import { Form } from '../../models/form';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {
  private model: Promise<Form>;
  private formDefinition = <FormDefinition>{
    fields: [
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
        label: 'address',
        name: 'address'
      },
      {
        type: 'text',
        label: 'city',
        name: 'city'
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
      }
    ]
  };

  constructor(
    public nav: NavController,
    public signinService: SigninService,
    private store: Store<string>,
    private formsService: FormsService
  ) {
    this.store.select('user').subscribe(() => {
      this.model = this.formsService.getNewFormModel(this.formDefinition, true, this.signinService.user);
      this.model.then(form => {
        form.formChangedEmmitter.subscribe(() => {
          this.signinService.changeUser(this.signinService.user)
        });
      });
    });
  }

  // go to changing password page
  changePassword() {
    this.nav.push(ChangePasswordPage);
  }
}
