import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  form: FormGroup;
  searchStr = '';

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(15)])
    });
  }

  submit() {

  }
}
