import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {QuillModule} from 'ngx-quill';
import {FilterCategoryPipe} from './pipes/filter-category.pipe';

@NgModule({
  imports: [
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    FilterCategoryPipe
  ],
  declarations: [
    FilterCategoryPipe
  ]
})
export class SharedModule {

}
