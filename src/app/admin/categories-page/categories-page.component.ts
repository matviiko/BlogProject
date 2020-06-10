import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../shared/interfaces';
import {CategoriesService} from '../../shared/services/categories.service';
import {AlertService} from '../shared/services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

  form: FormGroup;

  categories: Category[] = [];
  categoriesSub: Subscription;
  searchStr = '';
  deleteSub: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(15)])
    });

    this.categoriesSub = this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.form.value.name.toLowerCase(),
      date: new Date()
    };

    this.categoriesService.create(category).subscribe(() => {
      this.form.reset();
      this.categories.push(category);
      this.alertService.success('Post was created!');
    });
  }

  removeCategory(id: string) {
    this.deleteSub = this.categoriesService.remove(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== id);
      this.alertService.danger('Category was deleted!');
    });
  }

  ngOnDestroy() {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
