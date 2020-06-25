import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CounterPostsPipe } from './pipes/counter-posts.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  imports: [HttpClientModule, NgbPaginationModule, NgbAlertModule, NgbModule, QuillModule.forRoot(), CommonModule, RouterModule],
  exports: [HttpClientModule, QuillModule, FilterCategoryPipe, SidebarComponent, CommentComponent],
  declarations: [FilterCategoryPipe, SidebarComponent, CounterPostsPipe, MaxLengthPipe, CommentComponent],
})
export class SharedModule {}
