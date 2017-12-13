import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";

@Injectable()
export class SlideService {
  private items: any;

  constructor(private fileService: FileService) {
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("slides").then(result => {
      this.items = Utils.objectToArrayStoreKeys(result);
      this.items = this.items.filter(x => x.enable);
      return this.items;
    });
  }
}
