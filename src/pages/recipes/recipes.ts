import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KoreaService } from '../../services/korea-service';
import { ModalService } from '../../services/modal-service';
import { UserPage } from '../user-page/user-page';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  // list of categories
  public recipes: any[];

  constructor(
    public nav: NavController,
    public koreaService: KoreaService,
    public modalService: ModalService
  ) {
    this.modalService.showWait(koreaService.getRecipes().then(recipes => {
      this.recipes = recipes;
    }));
  }

  // view category
  view(data) {
    this.nav.push(UserPage, data);
  }
}
