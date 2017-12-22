import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";

@Injectable()
export class PagesService {
  private pages: any;

  constructor(private fileService: FileService) {
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("pages").then(result => {
      this.pages = Utils.objectToArrayStoreKeys(result);
      return this.pages;
    })
  }
}
