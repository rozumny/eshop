import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";

@Injectable()
export class PaymentService {
  private payments: any;

  constructor(
    private fileService: FileService
  ) {
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("payments").then(result => {
      this.payments = Utils.objectToArrayStoreKeys(result);
      return this.payments.filter(x => x.enable);
    })
  }
}
