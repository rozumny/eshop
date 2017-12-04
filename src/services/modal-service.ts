import { Injectable } from '@angular/core';
import { Alert, AlertController, LoadingController, ToastController, Toast } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class ModalService {

    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private translate: TranslateService
    ) {
    }

    public showWait(promise: Promise<any>): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const loading = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            loading.present();
            promise
                .then((data) => {
                    loading.dismiss().then(() => {
                        resolve(data);
                    });
                })
                .catch(error => {
                    loading.dismiss().then(() => {
                        reject(error);
                    });
                });
        });
    }

    public createToast(translationKey: string, interpolateParams?: Object): Toast {
        return this.toastCtrl.create({
            message: this.translate.instant(translationKey, interpolateParams),
            duration: 3000
        });
    }

    public createAlert(header: string, body: string, buttons: any, inputs?: any): Alert {
        const alertPrompt = {
            title: header,
            message: body,
            buttons: buttons
        };
        if (inputs) {
            alertPrompt['inputs'] = inputs;
        }
        return this.alertCtrl.create(alertPrompt);
    }
}