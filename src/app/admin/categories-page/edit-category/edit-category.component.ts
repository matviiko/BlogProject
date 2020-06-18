import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { CategoriesService } from "../../../shared/services/categories.service";
import { Category } from "../../../shared/interfaces";
import { Subscription } from "rxjs";
import { AlertService } from "../../shared/services/alert.service";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  categoryBeforeEdit: Category;
  updateSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.categoriesService.getCategoryById(params["id"]);
        })
      )
      .subscribe((category: Category) => {
        this.categoryBeforeEdit = category;
        this.editForm = new FormGroup({
          nameEditCategory: new FormControl(category.name, [Validators.required, Validators.maxLength(15)]),
        });
      });
  }

  submitEditCategory() {
    this.updateSub = this.categoriesService
      .update({
        ...this.categoryBeforeEdit,
        name: this.editForm.value.nameEditCategory,
      })
      .subscribe(() => {
        this.alertService.success("Category was changed!");
        this.router.navigate(["admin", "categories"]);
      });
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
