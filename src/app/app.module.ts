import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, HomePageComponent, PostPageComponent, PostComponent, CategoryPageComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SharedModule, NgbCarouselModule, BrowserAnimationsModule, NgxPaginationModule],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
