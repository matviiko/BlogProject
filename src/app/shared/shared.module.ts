import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CounterPostsPipe } from './pipes/counter-posts.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        HttpClientModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbModule,
        QuillModule.forRoot(),
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
    ],
  exports: [
    HttpClientModule,
    QuillModule,
    FilterCategoryPipe,
    SidebarComponent,
    CommentComponent,
    CommentFormComponent,
    MatMenuModule,
    MatIconModule,
  ],
  declarations: [FilterCategoryPipe, SidebarComponent, CounterPostsPipe, MaxLengthPipe, CommentComponent, CommentFormComponent],
})
export class SharedModule {}
