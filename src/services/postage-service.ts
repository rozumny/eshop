import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";

@Injectable()
export class PostageService {
  private postage: any;

  constructor(private fileService: FileService) {
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("postages").then(result => {
      this.postage = Utils.objectToArrayStoreKeys(result);
      return this.postage.filter(x => x.enable);
    })
  }
}
