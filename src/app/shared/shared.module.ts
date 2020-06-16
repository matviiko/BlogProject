import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {QuillModule} from 'ngx-quill';

import {FilterCategoryPipe} from './pipes/filter-category.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {CommonModule} from '@angular/common';
import { CounterPostsPipe } from './pipes/counter-posts.pipe';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        HttpClientModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbModule,
        QuillModule.forRoot(),
        CommonModule,
        RouterModule
    ],
  exports: [
    HttpClientModule,
    QuillModule,
    FilterCategoryPipe,
    SidebarComponent
  ],
  declarations: [
    FilterCategoryPipe,
    SidebarComponent,
    CounterPostsPipe
  ]
})
export class SharedModule {

}
