import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {NgbAlertModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class SharedModule {

}
