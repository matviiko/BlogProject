import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CounterPostsPipe } from './pipes/counter-posts.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

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
  ],
  exports: [HttpClientModule, QuillModule, FilterCategoryPipe, SidebarComponent, CommentComponent, CommentFormComponent],
  declarations: [FilterCategoryPipe, SidebarComponent, CounterPostsPipe, MaxLengthPipe, CommentComponent, CommentFormComponent],
})
export class SharedModule {}
