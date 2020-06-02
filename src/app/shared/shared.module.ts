import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {NgbAlertModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {QuillModule} from 'ngx-quill';

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
    QuillModule
  ]
})
export class SharedModule {

}
